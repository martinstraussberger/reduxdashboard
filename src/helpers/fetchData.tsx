const GOOGLE_SHEET_ID_PRIV = '1X_kPy_kxo3ISC5dHZ0e-efuq0wxo8bq06-r2DkjdQzw';
const GOOGLE_SHEET_TITLE = 'Black Products Inc';
const GOOGLE_SHEET_RANGE = 'A1:D94';

export const URL =
  'https://docs.google.com/spreadsheets/d/' +
  GOOGLE_SHEET_ID_PRIV +
  '/gviz/tq?sheet=out:json' +
  GOOGLE_SHEET_TITLE +
  '&range=' +
  GOOGLE_SHEET_RANGE;

export const fetchData = async (
  setError: (value: any) => void,
  setData: (value: any) => void,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);
  try {
    await fetch(URL, { method: 'GET' })
      .then((response) => response.text())
      .then((responseText) => {
        const parseAsJSONObject = JSON.parse(responseText.substring(47).slice(0, -2));
        setData(parseAsJSONObject.table.rows);
      });
  } catch (error) {
    setError(Error);
    console.log('An error occured: ', Error);
  } finally {
    setLoading(false);
  }
};
