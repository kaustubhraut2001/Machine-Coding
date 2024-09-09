import { useCallback, useState , useRef} from 'react'
import Infinitescroll from './infinitescroll';
import './App.css'

function App() {

  const[textContent ,  setTextContent] = useState("");
  const[apiData , setApiData] = useState([]);
  const controllerref = useRef();

  const handleInputChange = useCallback((e)=>{
    setTextContent(e.target.value);

  },[]);

  const getData = useCallback((query , pageNo)=>{
    return new Promise(async (resolve , reject)=>{
      try{
        if(controllerref.current){
          controllerref.current.abort();

        }
        controllerref.current = new AbortController();

        const data = await fetch("https://openlibrary.org/search.json?" + new URLSearchParams({
          q : query,
          page : pageNo
        }) , {
          signal : controllerref.current.signal
        });
        const response = await data.json();

        console.log(response , "123" );
        resolve();
        setApiData((prevData)=>[...prevData , ...response.docs]);
        }catch(error){
          reject();
        console.error(error);
      }
    });




  },[]);
  return (
    <>
      <input type="text" placeholder="search" value={textContent} onChange={handleInputChange}/>
      {/* <infinitescroll
      renderListItems = {""}
      textContent={textContent}
      getData={getData}
      listData={""}

      /> */}
      <Infinitescroll
        renderListItems = {""}
        textContent={textContent}
        getData={getData}
        listData={""}
      />
    </>
  )
}

export default App
