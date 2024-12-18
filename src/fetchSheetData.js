const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// 서비스 계정 키 파일 경로
const SERVICE_ACCOUNT_FILE = "../service-account-key.json"; // src 기준 상위 디렉터리로 수정


// 스프레드시트 ID와 시트 이름
const SPREADSHEET_ID = "1FIqB2fw2y4bWIuNyFxNF6R6bpCVQUd4blO3jvhRJF9Q";

// Google Sheets API 클라이언트 생성
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

const SHEETS_TO_FETCH = [
    { sheetName: "sheet1", outputFileName: "product.json" },
    { sheetName: "main", outputFileName: "best.json" },
    { sheetName: "recipe", outputFileName: "recipe.json" },
    { sheetName: "mainrecipe", outputFileName: "mainrecipe.json" },
    { sheetName: "review", outputFileName: "review.json" }
];

async function fetchSheetData(sheetName, outputFileName) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: sheetName,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log(`No data found in sheet: ${sheetName}`);
            return;
        }

        // 데이터를 JSON 형식으로 변환
        const [headers, ...dataRows] = rows;
        const jsonData = dataRows.map((row) => {
            return headers.reduce((obj, header, index) => {
                obj[header] = row[index] || "";
                return obj;
            }, {});
        });

        // 파일 저장 경로 설정
        const outputFolder = path.join(__dirname, "data");
        const outputFile = path.join(outputFolder, outputFileName);

        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder); // data 폴더가 없으면 생성
        }

        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
        console.log(`Data from sheet '${sheetName}' successfully written to ${outputFile}`);
    } catch (err) {
        console.error(`Error fetching data from sheet '${sheetName}':`, err);
    }
}

// 여러 시트를 순차적으로 처리
async function fetchAllSheets() {
    for (const { sheetName, outputFileName } of SHEETS_TO_FETCH) {
        await fetchSheetData(sheetName, outputFileName); // 각 시트 데이터 저장
    }
}

fetchAllSheets();