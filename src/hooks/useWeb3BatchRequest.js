import { useSelector } from "react-redux";

const useWeb3BatchRequest = () => {
  const { web3InstETH } = useSelector((state) => state.essential);

  const makeBatchRequest = async (
    calls = [],
    native = [],
    from = "0x0000000000000000000000000000000000000000"
  ) => {
    let batch = new web3InstETH.BatchRequest();
    let promises = [];
    if (calls.length > 0) {
      promises = calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request({ from: from }, (err, data) => {
            if (err) rej(err);
            else res(data);
          });
          batch.add(req);
        });
      });
    }
    let promises2 = [];
    if (native.length > 0) {
      promises2 = native.map((call) => {
        return new Promise((res, rej) => {
          let req = call[0].request(call[1], "latest", (err, data) => {
            if (err) rej(err);
            else res(data);
          });
          batch.add(req);
        });
      });
    }
    if (promises.length > 0 || promises2.length > 0) {
      batch.execute();
    }
    return Promise.all([...promises, ...promises2]);
  };

  return { makeBatchRequest };
};

export default useWeb3BatchRequest;
