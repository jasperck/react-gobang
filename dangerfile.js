import { danger, warn, message } from 'danger';
const fetch = require('node-fetch');

const GITHUB_API_BUILD_STATUS = 'https://api.github.com/repos/jasperck/react-gobang/statuses';
const CIRCLE_API_BUILD_ARTIFACTS = 'https://circleci.com/api/v1.1/project/github/jasperck/react-gobang';
const CIRCLE_TOKEN = process.env.CIRCLE_TOKEN;
const MOCK_BUILD_NUMBER = '62';

/**
 * Parse build status for build number from target_url
 * @param {string} url
 */
const getCircleBuildNumber = url => url.replace(/\?.*/, '').split('/').pop();

/**
 * GET base branch build status by SHA1
 * @param {string} sha
 */
const getPrevBuildStatus = async sha => {
  const status = await fetch(`${GITHUB_API_BUILD_STATUS}/${sha}`);
  return status.json();
};

/**
 * GET specific artifacts by build number
 * @param {number} buildNumber
 */
const getPrevArtifacts = async buildNumber => {
  const artifacts = await fetch(`${CIRCLE_API_BUILD_ARTIFACTS}/${buildNumber}/artifacts?circle-token=${CIRCLE_TOKEN}`);
  return artifacts.json();
};

/**
 * Download artifact
 * @param {string} url
 */
const getStatsFile = async url => {
  const file = await fetch(url);
  return file.json();
};

(async function() {
  const pr = danger.github.pr;
  const { ref, sha } = pr.base;

  const prevBuildStatus = await getPrevBuildStatus(sha);

  if (prevBuildStatus.length) {
    // const prevBuildNumber = getCircleBuildNumber(prevBuildStatus[0].target_url);
    const prevBuildNumber = MOCK_BUILD_NUMBER;

    const prevArtifacts = await getPrevArtifacts(prevBuildNumber)

    if (prevArtifacts.length) {
      // find artifact actual URL
      const prevArtifactURL = prevArtifacts[0].url;

      const stats = await getStatsFile(prevArtifactURL);
      message(stats);
    }
  }
})();