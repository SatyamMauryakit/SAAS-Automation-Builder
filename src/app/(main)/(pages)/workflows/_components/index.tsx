import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = ({}: Props)=> {
  return (<>
    <div className='relative flex flex-col gap-4'>

        <section className="flex flex-col gap-4 m-2">
            <Workflow  description='create a new workflow' id='3j9u434394rj949r' name='auotomate' publish={false} key=''/>
        </section>
    </div>
    
    </>
    
  )
}

export default Workflows