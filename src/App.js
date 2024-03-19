import {useState,useCallback,useEffect,useRef} from 'react'

function App() {
 const [length,setlength]=useState(8) ;
 const [numAllowed,setnumAllowed]=useState(false);
 const [charAllowed,setcharAllowed]=useState(false)
 const [password,setPassword]= useState("")

//  userRef hook
const passRef = useRef(null)

 const passwordGenerator= useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*{}"

  for(let i =1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
  setPassword(pass)

 },[length,numAllowed,charAllowed,setPassword])

 const copyPasswordToClipboard = useCallback(()=>{
  passRef.current?.select()
  passRef.current?.setSelectionRange(0,99)
  window.navigator.clipboard.writeText(password)
 },[password])

 useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,setPassword])

  
  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-900-700 bg-gray-500'>
    <h1 className="text-center text-white my-3">Password Generator</h1>
      <div className='flex shadow-sm rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passRef}></input>
        <button className='bg-blue-900 text-white p-2 ' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-s-2'>
        <div className='flex items-center gap-x-1 mx-2'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}></input>
          <label className='font-[500]'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numAllowed} id='numinput' onChange={()=>{setnumAllowed((prev)=>!prev)}}></input>
          <label className='font-[500]'>Number</label>
          <input type='checkbox' defaultChecked={charAllowed} id='numinput' onChange={()=>{setcharAllowed((prev)=>!prev)}}></input>
          <label className='font-[500]'>Character</label>
        </div>

      </div>
    </div>
    
    </>
  );
}

export default App;
