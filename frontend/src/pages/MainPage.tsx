import { useState, useEffect } from "react"
import InputText from "../components/InputText"
import MainHeading from "../components/MainHeading"
import LinkTable, { TableColumn, TableRow } from "../components/LinkTable"
import { generateShortLink, getList } from "../datasource/remote"
import { ISnackBarState } from "../core/interface"
import { SnackbarVariant } from "../core/enum"
import Snackbar from "../components/Snackbar"
import { getShortLinkUrl } from "../core/helper"
import CopyBtn from "../components/CopyBtn"
import { ExpireValueType } from "../core/type"
import RedirectBtn from "../components/RedirectBtn"

const columns:TableColumn[] = [
  {
    id: "short-url",
    label: "Short Url",
    align: "left",
    width: "50%"
  },
  {
    id: "original-url",
    label: "Original Url",
    align: "left",
    width: "50%"
  },
];

const intialSnackBarState: ISnackBarState = {
  message: '',
  show: false,
  variant: SnackbarVariant.WARNING,
};

const MainPage = () => {
  const [url, setUrl] = useState<string>('')
  const [expire, setExpire] = useState<ExpireValueType>("1-day")
  const [rows, setRows] = useState<TableRow[]>([])
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>(intialSnackBarState)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getList()
        if(data) {
          const result: any[] = [];
          Object.entries(data.data).forEach(([short, long]) => {
            result.push({
              "short-url": (
                <div className="flex items-center gap-4">
                    {getShortLinkUrl(short)}
                    <CopyBtn copyText={getShortLinkUrl(short)} />
                </div>),
              "original-url": (
                <div className="flex items-center gap-4">
                  {long as string}
                  <RedirectBtn redirectUrl={long as string} target="_blank" />
                </div>
              ),
            })
          });
          setRows(result)
        }
      } catch (err) {
        setSnackBarState({ message: "Unable to fetch list", show: true, variant: SnackbarVariant.ERROR })
      }
    })()
  }, [])

  const btnClickHandler = async () => {
    if(!url) {
      setSnackBarState({ message: "Please enter url", show: true, variant: SnackbarVariant.ERROR })
      return;
    }
    try {
      const {data} = await generateShortLink(url, expire)
      if(data.status == 'success') {
        window.location.reload();
      }
    } catch(err) {
      setSnackBarState({ message: "Failed to generate short url, Note: may be you forgot to add protocol (http|s)", show: true, variant: SnackbarVariant.ERROR })
    }
  }

  return (
    <>
      <Snackbar
        message={snackBarState.message}
        show={snackBarState.show}
        variant={snackBarState.variant}
        onClose={() => setSnackBarState(intialSnackBarState)}
      />


      <div className="grid place-items-center">
        <div className="container max-w-screen-lg px-5">
          <div className="mt-12">
            <MainHeading/>
          </div>
          <div className="my-14">
            <InputText inputValue={url} setInputValue={setUrl} expireValue={expire} setExpireValue={setExpire} btnClick={btnClickHandler}/>
          </div>
          <div className="my-8">
            <LinkTable columns={columns} rows={rows}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage