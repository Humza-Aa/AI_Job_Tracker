async function createSheet(sheetName, sheets, spreadsheetId) {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = createSheet;
