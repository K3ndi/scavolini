export const getURL = () => 'http://10.10.199.137';
export const getApiEndPoint = (): string => 'http://10.10.199.137/api/';

/**
 * Used when a function needs to return the query results as an array of objects with type T
 *
 * @success {true} when the query as been executed succesfully, {false} otherwhise
 * @error {undefined} if the query has been executed succesfully, a string containing the error otherwise
 * @results an array of objects if the query has been executed succesfully, null otherwise
 */
export type ReturnManyQueryType<T> = {
  success: boolean;
  results?: T[];
  error?: string;
};

/**
 * Used when function needs to return the query result as a single object with type T
 *
 * @success {true} when the query as been executed succesfully, {false} otherwhise
 * @error {undefined} if the query has been executed succesfully, a string containing the error otherwise
 * @result an array of objects if the query has been executed succesfully, null otherwise
 */
export type ReturnOneQueryType<T> = {
  success: boolean;
  result?: T;
  error?: string;
  status?: number;
};

/**APP ENDPOINTS */
const AziendaLoginEndPoint =
  getApiEndPoint() + 'Dipendente/getdipendenteprogrammi';
const GetSuppliersEndPoint = getApiEndPoint() + 'Fornitore/getfornitori';
//* (e.g. of label read #A020375504|C00018|00002|728|597#A15524010597|00300)
const GetReadBarCodeEndPoint =
  getApiEndPoint() + 'Etichetta/parserEtichettacondevice';
const GetVerifySupplierEndPoint = 'Accettazione/VerificaEtkFornitore';
const GetInformationOdaEndPoint = 'Produzione/getInformazionioda';

const GETRistampaETK = 'RichiestaAttesaComandi/ristampaetksorter';

type WSReturnType<T> = {
  errorMessage: string;
  statusCode: number;
  success: boolean;
  value: T;
};

export {
  AziendaLoginEndPoint,
  GetSuppliersEndPoint,
  GetReadBarCodeEndPoint,
  GetVerifySupplierEndPoint,
  GetInformationOdaEndPoint,
  GETRistampaETK,
};

export type {WSReturnType};
