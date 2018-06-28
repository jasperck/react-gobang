import { danger, message, markdown } from "danger";
const fetch = require("node-fetch");
const _ = require("lodash");
const filesize = require('filesize');

const statsJSON = require("./stats.json");
const prevStatsJSON = require("./prev-stats.json");

const GITHUB_API_BUILD_STATUS = 'https://api.github.com/repos/jasperck/react-gobang/statuses';
const CIRCLE_API_BUILD_ARTIFACTS = 'https://circleci.com/api/v1.1/project/github/jasperck/react-gobang';
const CIRCLE_TOKEN = process.env.CIRCLE_TOKEN;
const MOCK_BUILD_NUMBER = '62';
const FILENAME_QUERY_REGEXP = /\?.*$/;

/**
 * Parse build status for build number from target_url
 * @param {string} url
 */
const getCircleBuildNumber = url =>
  url
    .replace(/\?.*/, "")
    .split("/")
    .pop();

/**
 * GET base branch build status by SHA1
 * @param {string} sha
 */
const getPrevBuildStatus = async (sha) => {
  const status = await fetch(`${GITHUB_API_BUILD_STATUS}/${sha}`);
  return status.json();
};

/**
 * GET specific artifacts by build number
 * @param {number} buildNumber
 */
const getPrevArtifacts = async (buildNumber) => {
  const artifacts = await fetch(
    `${CIRCLE_API_BUILD_ARTIFACTS}/${buildNumber}/artifacts?circle-token=${CIRCLE_TOKEN}`
  );
  return artifacts.json();
};

/**
 * Download artifact
 * @param {string} url
 */
const getStatsFile = async (url) => {
  const file = await fetch(url);
  return file.json();
};

/**
 * Filter out
 *   - query part from chunk name
 *   - non-js chunk file
 *   - local/translation chunk
 *   - chunk without chunk name
 * @param {*} assets
 */
const filterAssets = assets =>
  assets.filter(asset => {
    asset.name = asset.name.replace(FILENAME_QUERY_REGEXP, "");
    return (
      _.endsWith(asset.name, ".js") &&
      !_.isEmpty(asset.chunks) &&
      !_.some(['locale', 'translation'], nameNotShow => _.includes(asset.name, nameNotShow)) &&
      !_.isEmpty(asset.chunkNames)
    );
  });

const normalizeChunk = chunks => chunks.reduce(
  (acc, cur) => [
    ...acc,
    // not sure flatting [chunkNames] here will exists edge case
    { name: cur.chunkNames[0], size: cur.size, chunkNames: cur.name, currSize: 0, prevSize: 0 }
  ],
  []
);

const generateChunkToShow = (prevChunks, curChunks) => {
  const chunksToShow = {
    newChunks: [],
    removeChunks: [],
    sizeChangedChunks: [],
  };

  chunksToShow.removeChunks = _.differenceBy(prevChunks, curChunks, "name").reduce((acc,cur) => {
    return [
      ...acc,
      { ...cur, prevSize: cur.size },
    ];
  }, []);

  curChunks.forEach((cur) => {
    const prevChunk = _.find(prevChunks, ['name', cur.name]);
    if (!prevChunk) {
      chunksToShow.newChunks.push({
        ...cur,
        currSize: cur.size,
      });
    } else {
      chunksToShow.sizeChangedChunks.push({
        ...cur,
        prevSize: prevChunk.size,
        currSize: cur.size,
      });
    }
  });

  return chunksToShow;
};

/**
 * Generates a Markdown table
 * @param {string[]} headers
 * @param {string[][]} body
 */
const generateMDTable = (headers, body) => {
  const tableHeaders = [
    headers.join(' | '),
    headers.map(() => ' --- ').join(' | '),
  ];

  const tablebody = body.map(r => r.join(' | '));
  return tableHeaders.join('\n') + '\n' + tablebody.join('\n');
};

const generateOutput = (chunk) => {
  const tables = [];
  const mdHeaders = ['Chunk', 'Size Diff', 'Prev Size', 'Current Size'];

  Object.keys(chunk).forEach((status) => {
    tables.push(`\n <details><summary>${status}</summary>\n`);
    const mdChunks = chunk[status].map(chunk => ([
      String(chunk.name).replace(/~/g, '\\~'),
      filesize(chunk.currSize - chunk.prevSize),
      filesize(chunk.prevSize),
      filesize(chunk.currSize),
    ]))
    tables.push(generateMDTable(mdHeaders, mdChunks));
    tables.push('\n </details>');
  });

  return { tables };
};

const generateNetlifyURL = branchName => `https://${branchName.replace(/[\/, _]/g, '-')}--17live.netlify.com`;

const convertMDSummary = ({ prevSha, currSha, tables, branchName, infos }) => (
  [
    `:link: [Netlify](${generateNetlifyURL(branchName)})`,
    `:art: [Storybook](${generateNetlifyURL(branchName)}/storybook)`,
    `:construction: **Comparing ${prevSha}...${currSha}**`,
    `## :memo: Bundle Status`,
    infos && `${infos}`,
    tables && `
      ${tables.join('\n')}
    `,
  ]
    .filter(Boolean)
    .join('\n')
);

(async () => {
  const pr = danger.github.pr;
  const { ref, sha } = pr.base;
  const { ref: branchName } = pr.head;
  let summary = {
    prevSha: sha,
    currSha: pr.head.sha,
    branchName,
  };

  const prevBuildStatus = await getPrevBuildStatus(sha);

  if (!prevBuildStatus.length) {
    summary = convertMDSummary({ ...summary, infos: 'No previous build found!' });
  } else {
    // const prevBuildNumber = getCircleBuildNumber(prevBuildStatus[0].target_url);
    const prevBuildNumber = MOCK_BUILD_NUMBER;

    const prevArtifacts = await getPrevArtifacts(prevBuildNumber)

    if (prevArtifacts.length) {
      // find artifact actual URL
      const prevArtifactURL = prevArtifacts[0].url;

      const stats = await getStatsFile(prevArtifactURL);

      // get all asset names
      let { assets } = statsJSON;
      let { assets: prevAssets } = prevStatsJSON;

      assets = filterAssets(assets);
      prevAssets = filterAssets(prevAssets);

      const curChunks = normalizeChunk(assets);
      const prevChunks = normalizeChunk(prevAssets);

      // generate chunks of new/removed/size-changed for show
      const chunksToShow = generateChunkToShow(prevChunks, curChunks);

      // generate output collection
      const output = generateOutput(chunksToShow);

      // convert output to markdown style
      summary = convertMDSummary({ ...summary, ...output });
    } else {
      summary = convertMDSummary({ ...summary, infos: 'No previous build stats.json found!' });
    }
  }
  // commit results
  markdown(summary);
})();
