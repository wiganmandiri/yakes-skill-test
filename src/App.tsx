import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import _ from 'lodash'

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [formValue, setFormValue]: any = useState({
    nama: '',
    poli: '',
    antrian: ''
  })

  const onChange = (e: any) => {
    setFormValue((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleOpenForm = (nomor: any) => {
    if (_.some(JSON.parse(localStorage.getItem("data")), idx => idx.antrian === nomor)) {
      setIsOpen(false)
      setIsOpenSidebar(true)
    }
    else {
      setIsOpenSidebar(false)
      setIsOpen(true)
    }
    setFormValue((prevState: any) => ({
      ...prevState,
      antrian: nomor
    }))
  }

  // let [data, setData]: any[] = useState([])

  const handleSubmit = () => {
    let data: any = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
    let storeData = [...data, formValue]
    localStorage.setItem("data", JSON.stringify(storeData))

    setIsOpen(false)
  }

  return (
    <main className="max-w-[1200px] h-screen m-auto py-20">
      {
        isOpen ?
          <div className='fixed inset-0 bg-gray-500 h-full z-40 bg-opacity-25 backdrop-blur-sm'>
            <div className='flex w-full h-full justify-center items-center'>
              <div className='bg-white w-[400px] h-fit opacity-100 p-4'>
                <div className='gap-4'>
                  <form className='flex flex-col gap-4'>
                    <div className='flex space-x-2'>
                      <label className='w-2/3'>Nomor Antrian: {formValue.antrian}</label>
                    </div>
                    <div className='flex space-x-2'>
                      <label className='w-2/3'>Nama Pasien</label>
                      <input onChange={(e) => onChange(e)} className='px-2 border-2 bg-white' name='nama' placeholder='input name' />
                    </div>
                    <div className='flex space-x-2'>
                      <label className='w-2/3'>Poli</label>
                      <select className='px-2 border-2 bg-white w-full' onChange={(e) => onChange(e)} name='poli'>
                        <option value={'umum'}>Umum</option>
                        <option value={'anak'}>Anak</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className='flex gap-2 w-full justify-end mt-5'>
                  <button onClick={() => setIsOpen(false)} className='px-4 bg-gray-400 text-white'>Back</button>
                  <button onClick={() => handleSubmit()} className='px-4 bg-blue-300'>Submit</button>
                </div>
              </div>
            </div>
          </div> : null
      }
      <div className='bg-slate-200 p-4 flex gap-4'>
        <div className='space-y-4 w-full'>
          <div className='flex flex-wrap gap-4'>
            {

              _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (index, key) => (
                <>
                  {index === 1 && <div className='bg-cyan-500 text-white w-full'>Sesi 1</div>}
                  {index === 6 && <div className='bg-cyan-500 text-white w-full'>Sesi 2</div>}
                  <button key={key} onClick={() => handleOpenForm(index)} className={`${_.some(JSON.parse(localStorage.getItem("data")), idx => idx.antrian === index) ? "bg-gray-400" : "bg-white"} shadow-md w-10 h-10`}>{index}</button>
                </>
              ))
            }
          </div>
          {/* <div className='bg-cyan-500 text-white'>Sesi 2</div>
          <div className='flex flex-wrap gap-4'>
            <div className='bg-white shadow-md w-10 h-10'></div>
            <div className='bg-white shadow-md w-10 h-10'></div>
            <div className='bg-white shadow-md w-10 h-10'></div>
          </div> */}
        </div>
        {
          isOpenSidebar && _.map(JSON.parse(localStorage.getItem("data")), index => index.antrian === formValue.antrian && (
            <div className='w-2/3'>
              <div className='flex gap-2 w-full'>
                <div className='w-2/3'>Nomor Antrian</div>
                <p>:</p>
                <div className='w-full'>{index.antrian}</div>
              </div>
              <div className='flex gap-2 w-full'>
                <div className='w-2/3'>Nama</div>
                <p>:</p>
                <div className='w-full'>{index.nama}</div>
              </div>
              <div className='flex gap-2 w-full'>
                <div className='w-2/3'>Poli</div>
                <p>:</p>
                <div className='w-full'>{index.poli}</div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default App
