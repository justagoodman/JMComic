import API from '../App/API/BasicRequest';
import {API_ABILITY} from '../App/API/BasicRequest';

it('should get array from api', (done) => {
  API.GET(API_ABILITY.API_COMIC_LATEST).then((comics) => {
    console.log(comics);
    expect(comics.length > 0);
    done();
  });
});
