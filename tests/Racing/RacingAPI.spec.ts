import RacingAPI from '../../pages/RacingAPI.module';

describe('RacingAPI', () => {
  let racingAPI: RacingAPI

  beforeAll(async () => {
    racingAPI = new RacingAPI();
  });

  it('ZED-253 - Racing Service allows nominating horses to available gates for free races', async () => {
    await racingAPI.apiLogin()
    await racingAPI.apiNominateHorse()
  });

});
