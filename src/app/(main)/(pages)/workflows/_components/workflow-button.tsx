'use client'
import Workflowform from '@/components/forms/workflow-form'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '@/components/global/custom-modal'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

function WorkflowButton({}: Props) {
  const {setOpen, setClose} = useModal()
    const handleClick = () => { 
      setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>
    )
    }
  return (

    <div>
        <Button size={'icon'}
        onClick={handleClick}
        >
            <Plus/>
        </Button>
        
             </div>
  )
}

export default WorkflowButton