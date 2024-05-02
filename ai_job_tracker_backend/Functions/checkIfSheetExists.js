async function checkIfSheetExists(sheetName, sheet, spreadsheetId) {
  try {
    const response = await sheet.spreadsheets.get({
      spreadsheetId,
    });
    if (response.data.properties.title !== sheetName) {
      return false;
    }
    return true;
  } catch (error) {
    // console.error("Error checking if sheet exists:", error);
    return false;
  }
}

module.exports = checkIfSheetExists;
