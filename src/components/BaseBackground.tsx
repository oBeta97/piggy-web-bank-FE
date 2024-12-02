
interface prop {
    ChildComponent: JSX.Element; // To accept any react component
  }

export const BaseBackground = (props : prop) => {


    return (
        <>

            {props.ChildComponent}

            <div className='arc third-background-arc seccondary-arc-main-color'>
                <div className="dot dot-right"></div>
            </div>

            <div className='arc main-background-arc arc-main-color'>
                <div className='arc secondary-background-arc seccondary-arc-main-color'>
                    <div className="dot dot-center"></div>
                    <div className='arc secondary-background-arc seccondary-arc-main-color'>
                        <div className="dot dot-left"></div>
                        <div className='arc secondary-background-arc seccondary-arc-main-color'>
                            <div className="dot dot-right"></div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}