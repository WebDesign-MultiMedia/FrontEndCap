import React from 'react'
import Font from 'react-font';
const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
  ]
  
function Monitor() {
  return (
  <>
 
    <div>
      <div className="bg-gray-900 py-5 sm:py-32">
      <Font family='Josefin Slab'> <h2 className='text-center text-white font-thin text-4xl'>Monitors</h2></Font>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative right-32">
    
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            
        <iframe className='  md:relative md:left-52' width="600" height="371" seamless frameborder="0"  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSxa63C004L69u-_pa39VIxCc3FfF4_4-k8s4CwoMNvwVmHkeQcYfeld0TuA7UV5pHz1Z0Iiq7lEGKL/pubchart?oid=1234884701&amp;format=interactive"></iframe>

        <iframe className='  md:relative md:left-52' width="600" height="371" seamless frameborder="0"  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRO2mEi3ico8P9rXa-T3uFfF2Dx8r5mVu7rLJ8nhguF9w8sMdBH4esi5QQcoQfyJ8Cr_weZW-Z4MX7e/pubchart?oid=1864281559&amp;format=interactive"></iframe>

    </dl>
      </div>
    </div>
    </div>
    </>
  )
}

export default Monitor
