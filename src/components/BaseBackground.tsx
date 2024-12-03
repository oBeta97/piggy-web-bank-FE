
import '../style/background/arc.css'
import '../style/background/dot.css'


interface prop {
    ChildComponent: JSX.Element; // To accept any react component
  }

export const BaseBackground = (props : prop) => {


    return (
        <div className="background">

            {props.ChildComponent}

            <div className='arc third-background-arc secondary-arc-main-color'>
                <div className="dot dot-right" dot-index="1"></div>
            </div>

            <div className='arc main-background-arc arc-main-color'>
                <div className='arc secondary-background-arc secondary-arc-main-color'>
                    <div className="dot dot-center" dot-index="2"></div>
                    <div className='arc secondary-background-arc secondary-arc-main-color'>
                        <div className="dot dot-left" dot-index="3"></div>
                        <div className='arc secondary-background-arc secondary-arc-main-color'>
                            <div className="dot dot-right" dot-index="4"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}