import {
  AziendaLoginEndPoint,
  GETRistampaETK,
  GetInformationOdaEndPoint,
  GetReadBarCodeEndPoint,
  GetSuppliersEndPoint,
  GetVerifySupplierEndPoint,
  ReturnOneQueryType,
  WSReturnType,
} from '../api-endpoint-service';
import {
  CompanyLoginResponseType,
  InformationOdaResponseType,
  ReadBarCodeType,
  RistampaEtkParamRequest,
  SupplierParamRequestType,
  SupplierResponse,
  VerifySupplierParamRequest,
  VerifySupplierResponseType,
} from './types';

/**
 * Gets the company data
 * @param azienda contains the company number
 * @param matricola
 * @returns {Promise<ReturnOneQueryType<CompanyLoginResponseType>>}
 */
export const companyLogin = async (
  azienda: string | null,
  matricola: string | null,
): Promise<ReturnOneQueryType<CompanyLoginResponseType | null>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `${AziendaLoginEndPoint}?matricola=${matricola}&azienda=${azienda}`,
      requestObj,
    );
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<CompanyLoginResponseType> =
      await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: responseObject.value};
  } catch (error: any) {
    return {success: false, result: null, error: error.message};
  }
};

/**
 * Return an array of suppliers
 * @returns {Promise<ReturnManyQueryType<SupplierResponse>>}
 */
export const getSuppliers = async (
  paramRequest: SupplierParamRequestType,
): Promise<ReturnOneQueryType<SupplierResponse | null>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(paramRequest),
    };

    const response = await fetch(GetSuppliersEndPoint, requestObj);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<SupplierResponse> =
      await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: responseObject.value};
  } catch (error: any) {
    return {success: false, result: null, error: error.message};
  }
};

/**
 * Reads the BarCode data and returns some information
 * @rawBarCode gets the barcode value after scanning the barcode
 * @isManual its a boolean
 * @returns {Promise<ReturnOneQueryType<ReadBarCodeType>>}
 */
export const getReadBarCode = async (
  rawBarCode: string,
  isManual: boolean,
): Promise<ReturnOneQueryType<ReadBarCodeType | null>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `${GetReadBarCodeEndPoint}?symb=DataMatrix&raw=${rawBarCode}&isManuale=${isManual}&idTerminale=TEST`,
      requestObj,
    );
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<ReadBarCodeType> = await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: responseObject.value};
  } catch (error: any) {
    return {success: false, result: null, error: error.message};
  }
};

/**
 * Verifies if the supplier is the correct one
 * @paramRequest containes all the data to check for the supplier
 * @returns {Promise<ReturnOneQueryType<VerifySupplierResponseType>>}
 */
export const getVerifySupplier = async (
  paramRequest: VerifySupplierParamRequest,
): Promise<ReturnOneQueryType<VerifySupplierResponseType | null>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(paramRequest),
    };

    const response = await fetch(GetVerifySupplierEndPoint, requestObj);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<VerifySupplierResponseType> =
      await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: responseObject.value};
  } catch (error: any) {
    return {success: false, result: null, error: error.message};
  }
};

/**
 * Get a basic information on ODA
 * @oda
 * @posOda
 * @returns {Promise<ReturnOneQueryType<InformationOdaResponseType>>}
 */
export const getInformationOda = async (
  oda: string,
  posOda: string,
): Promise<ReturnOneQueryType<InformationOdaResponseType | null>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `${GetInformationOdaEndPoint}?oda=${oda}&posOda=${posOda}`,
      requestObj,
    );
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<InformationOdaResponseType> =
      await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: responseObject.value};
  } catch (error: any) {
    return {success: false, result: null, error: error.message};
  }
};

/**
 * Stamp the data
 * @paramReq
 * @returns {Promise<ReturnOneQueryType<boolean>>}
 */
export const getRistampaETK = async (
  paramReq: RistampaEtkParamRequest,
): Promise<ReturnOneQueryType<boolean>> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');

    const requestObj = {
      method: 'GET',
      headers: myHeaders,
      body: JSON.stringify(paramReq),
    };

    const response = await fetch(GETRistampaETK, requestObj);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const responseObject: WSReturnType<boolean> = await response.json();
    if (!responseObject.success) {
      throw new Error(responseObject.errorMessage);
    }

    return {success: true, result: true};
  } catch (error: any) {
    return {success: false, result: false, error: error.message};
  }
};
