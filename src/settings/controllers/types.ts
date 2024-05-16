//-----------------------AZIENDA LOGIN---------------------------//
type CompanyProgrammiType = {
  codice: string;
  immagine: string;
  nomeBreve: string;
  isMenuSap: boolean;
  id: string;
};

type CompanyLoginResponseType = {
  data: {
    programmi: CompanyProgrammiType[];
    matricola: number;
    nomeCognome: string;
    isDimesso: boolean;
    codiceReparto: string;
    nomeReparto: string;
    divisione: string;
    azienda: string;
    isScavolini: boolean;
    isErnestomeda: boolean;
    isScavoliniBagni: boolean;
    isLaccatoScavolini: boolean;
    isRepartoImballoAnte: boolean;
    isLaccatoErnestomeda: boolean;
    isFuoriMisuraErnestomeda: boolean;
    isScSpedizioniIta: boolean;
    isScSpedizioniEst: boolean;
    isRepartoTopMensole: boolean;
    isSpedizioniScavolini: boolean;
    isScCapoArea: boolean;
    isEldomScavolini: boolean;
    isMagRiordinatoreAnteScavolini: boolean;
    isMagazzinoErnestomeda: boolean;
    isFmLotto1Ernestomeda: boolean;
    getInfoBase: string;
  };
  total: number;
};

//-----------------------SUPPLIER TYPE-------------------------//

type SupplierParamRequestType = {
  matricola: number;
  azienda: string;
  codiceReparto: string;
  nomeTerminale: string;
  divisione: string;
  isScavolini: boolean;
  isErnestomeda: boolean;
  isScavoliniBagni: boolean;
  sorter_IsInBaia01: boolean;
};

type SupplierResponseType = {
  codice: string;
  ragioneSociale: string;
  altkn: string;
  filtroReportUguaglianza: number;
};

type SupplierResponse = {
  date: SupplierResponseType[];
  total: number;
};

//-----------------------READ BARCODE----------------------------//
type ReadBarCodeType = {
  data: {
    nomeLista: string;
    desmosIdx: string;
    codiceCollo: string;
    posizione: string;
    codArticolo: string;
    codColore: string;
    codFinitura: string;
    he: string;
    heFloat: number;
    le: string;
    leFloat: number;
    oda: string;
    posOda: string;
    tipoEtichetta: number;
    odv: string;
    partNumber: number;
    plnum: number;
    vornr: string;
    isManuale: boolean;
    idPan: string;
    isEtichettaNonDefinita: boolean;
    isEtichettaFornitore: boolean;
    isEtichettaProduzione: boolean;
    isEtichettaProduzioneManuale: boolean;
    isPreEtichettaEldom: boolean;
    isEtichettaDelGrezzo: boolean;
    isEtichettaVersamtoProduzione: boolean;
    isEtichettaPartNumber: boolean;
    isEtichettaCollo: boolean;
    isEtichettaColloPosizione: boolean;
    isMTO: boolean;
    isETK: boolean;
    isTAV: boolean;
    hasOda: boolean;
    hasNomeLista: boolean;
    hasIdx: boolean;
    sezionaA0: string;
    sezionaA1: string;
    sezionaA2: string;
    seziona01: string;
    seziona02: string;
    seziona03: string;
    seziona04: string;
    seziona05: string;
    hasIdPan: boolean;
  };
  total: number;
};

//-----------------------VERIFY SUPPLIER--------------------------//

type VerifySupplierParamRequest = {
  InfoUtente: {
    Matricola: number;
    Azienda: string;
    CodiceReparto: string;
    NomeTerminale: string;
    Divisione: string;
    IsScavolini: boolean;
    IsErnestomeda: boolean;
    IsScavoliniBagni: boolean;
    Sorter_IsInBaia01: boolean;
  };
  ProgrammaUsato: {
    Id: string;
    Codice: string;
  };
  EtichetteLette: {
    EtkFornitore: {
      BarcodeSymbology: string;
      Raw: string;
      IsManuale: boolean;
    };
    EtkProduzione: {
      BarcodeSymbology: string;
      Raw: string;
      IsManuale: boolean;
    };
    EtkProduzione2: {
      BarcodeSymbology: string;
      Raw: string;
      IsManuale: boolean;
    };
    IsLetturaDiReso: boolean;
  };
  InfoFornitore: {
    Altkn: string;
    Lifnr: string;
    RagioneSociale: string;
    DataConsegna: string;
    IdDocumento: number;
    DDTs: string[];
  };
  DatiProduzione: {
    DataSpedizione: string;
    DataProduzione: string;
    Zone: string[];
    IdFamigliaCatasta: number;
    IdCatasta: number;
  };
  DatiSegnalazioneMancante: {
    TipoSegnalazione: number;
    CausaleM: {
      Id: string;
      Descrizione: string;
    };
    CausaleN: {
      Id: string;
      Descrizione: string;
    };
    CausaleO: {
      Id: string;
      Descrizione: string;
    };
  };
  DatiSap: {
    QtaInserita: number;
    Um: string;
    Articolo: string;
    Descrizione: string;
    Segno: string;
    CodiceScaffale: string;
    DataRegistazione: string;
    CentroDiCosto: string;
  };
  DatiStampaEtk: string;
};

type VerifySupplierResponseType = {
  date: {
    isErrore: boolean;
    noTranscodifica: boolean;
    messaggio: string;
    codiceArticolo: string;
    dataCorretta: string;
    zona: string;
    etichettaCampioneColore: string;
    segnalazioneNoteArticolo: string;
    descrizione: string;
    isEtichettaCampioneColore: boolean;
    isSegnalazioneNoteArticolo: boolean;
    odv: string;
    posOdv: string;
    cliente: string;
    isEstero: boolean;
    posizioneInMagazzino: string;
    riferimento: string;
    isErroreData: boolean;
    tipoOrdine: string;
    umDispobili: string;
    qtaLetta: number;
    um: string;
    isUmLineare: boolean;
    isStampaEtk: boolean;
    nomeSorter: string;
    dataConsegna: string;
    colore: string;
    finitura: string;
    dimensioni: string;
    sensoVena: string;
    isDentroSorter: boolean;
    dataProduzione: string;
    idPan: string;
    idTask: string;
    idTaskSequenza: string;
    numeroSlot: string;
    idCarrello: string;
    progressivo: string;
  };
  total: number;
};

//----------------------INFORMATION ODA---------------------------//

type InformationOdaResponseType = {
  data: {
    odv: string;
    posOdv: string;
    dataSpedizione: string;
    idPan: string;
  };
  total: number;
};

type RistampaEtkParamRequest = {
  EtkFornitore: {
    BarcodeSymbology: string;
    Raw: string;
    IsManuale: boolean;
  };
};

export type {
  CompanyLoginResponseType,
  SupplierResponseType,
  ReadBarCodeType,
  VerifySupplierParamRequest,
  VerifySupplierResponseType,
  InformationOdaResponseType,
  CompanyProgrammiType,
  SupplierResponse,
  SupplierParamRequestType,
  RistampaEtkParamRequest,
};
