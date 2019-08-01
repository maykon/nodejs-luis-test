var path = require('path');
var Excel = require('exceljs');
const {
  LuisService
} = require('../services/luis_api');

const requestApi = async (awswer) => {
  const response = await LuisService({
    query: awswer
  });
  return response.data;
};

const processJSON = (data) => {
  const {
    intent,
    score
  } = data.topScoringIntent;
  const entities = [];
  data.entities.forEach(entity => entities.push(entity.type));
  // console.log(`${ intent } - ${ score } ${ entities }`);
  return {
    intent,
    score,
    entities
  };
};

const process = () => {
  var wb = new Excel.Workbook();
  var filePath = path.resolve(__dirname, 'test_api.xlsx');

  wb.xlsx.readFile(filePath).then(async () => {
    var sh = wb.getWorksheet(1);
    try {
      for (let i = 993; i <= sh.rowCount; i++) {
        try {
          const response = await requestApi(sh.getRow(i).getCell(1).value);
          const json = processJSON(response);
          sh.getRow(i).getCell(2).value = json.intent;
          sh.getRow(i).getCell(3).value = json.score;
          sh.getRow(i).getCell(4).value = json.entities.join(',');
          await new Promise(resolve => setTimeout(resolve, 250));
        } catch (err) {
          if (err.response) {
            console.error(`Error ${ err.response.status } -> ${ err.response.statusText }`);
          } else {
            console.error(err.message);
          }
        }
      }
    } finally {
      var filePath = path.resolve(__dirname, 'test_api2.xlsx');
      wb.xlsx.writeFile(filePath);
      console.log('Completed');
    }
  });
};

module.exports.TestLuisModel = () => {
  return Promise.resolve()
    .then(process)
    .catch(err => console.log(err));
};