/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useEffect} from 'react';

const BarcodeReaderComponent = props => {
  let defaultReader = null;

  let readerAutoClosed = false;

  let hidden, visibilityChange;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document[hidden]) {
        closeBarcodeReader(true);
      } else {
        if (readerAutoClosed) {
          openBarcodeReader();
        }
      }
    };

    const setup = () => {
      if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
      } else if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
      }

      if (
        hidden &&
        typeof document.addEventListener !== 'undefined' &&
        typeof document[hidden] !== 'undefined'
      ) {
        document.addEventListener(
          visibilityChange,
          handleVisibilityChange,
          false,
        );
      }
    };

    setup();
    openBarcodeReader(); // Open the Barcode Reader when the component mounts

    return () => {
      if (
        hidden &&
        typeof document.removeEventListener !== 'undefined' &&
        typeof document[hidden] !== 'undefined'
      ) {
        document.removeEventListener(
          visibilityChange,
          handleVisibilityChange,
          false,
        );
      }
      closeBarcodeReader(false); // Close the Barcode Reader when the component unmounts
    };
  }, []);

  const onBarcodeReaderComplete = result => {
    if (result.status === 0) {
      defaultReader.set(
        'Symbology',
        'DataMatrix',
        'Enable',
        'true',
        onSetComplete,
      );

      defaultReader.addEventListener(
        'barcodedataready',
        onBarcodeDataReady,
        false,
      );
      window.addEventListener('beforeunload', onBeforeUnload);
    } else {
      defaultReader = null;
      alert(`Failed to create BarcodeReader, ${result.message}`);
    }
  };

  const onSetComplete = result => {
    if (result.status != 0) {
      // Set failed.
      alert(
        'Failed to set: ' +
          result.family +
          ' Key: ' +
          result.key +
          ' Option: ' +
          result.option +
          ', error: ' +
          result.message,
      );
    }
  };

  const onBarcodeDataReady = (data, type, time) => {
    props.updateMatricolaByDataMatrix(data);
  };

  const openBarcodeReader = () => {
    if (!defaultReader) {
      defaultReader = new BarcodeReader(null, onBarcodeReaderComplete);
    }
  };

  const closeBarcodeReader = isAutoClose => {
    if (defaultReader) {
      readerAutoClosed = isAutoClose;
      defaultReader.close(result => {
        if (result.status === 0) {
          defaultReader = null;
          window.removeEventListener('beforeunload', onBeforeUnload);
        }
      });
    }
  };

  const onBeforeUnload = e => {
    const message = 'Please close BarcodeReader before leaving this page.';
    (e || window.event).returnValue = message;
    return message;
  };

  return (
    <input
      style={{position: 'absolute', zIndex: -9999, visibility: 'hidden'}}
      type="text"
      id="BarcodeData"
      placeholder="Barcode Data"
      readOnly
    />
  );
};

export default BarcodeReaderComponent;
