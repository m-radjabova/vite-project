import {ReactNode} from 'react'

interface BoxProps {
  children: ReactNode
  color?: string
}
function Box(props: BoxProps) {
  return (
    <div className="col-md-4">
        <div className={`card bg-${props.color} text-white mb-3 `}>
            <div className="card-header d-flex justify-content-between">
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default Box