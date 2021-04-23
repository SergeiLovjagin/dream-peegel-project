import React from "react";
import './Project.css'
import {useSelector} from "react-redux";
import {settingsPageSelector} from "../selectors/settings-page-selector";

export const Project = () => {

    const size = (width: number, height: number) => {
        return {width: width / 3, height: height / 3, border: '1px solid'}
    }

    const {
        mirrorHeight,
        mirrorWidth,
        backPlate,
        outerLeftRightSide,
        outerTopBottomSide,
        innerTopBottomSide,
        innerLeftRightSide,
        mirrorStandSize,
        mirrorStand,
        lamps
    } = useSelector(settingsPageSelector)

    const spanStyle = mirrorWidth < 1000 ? {marginRight: '-30px'} : {marginRight: '-40px'}

    let obj = Object.entries(lamps)
    return (
        <div className='container'>
            {
                mirrorHeight !== 0 &&
                <div>
                    <div className='mirror'>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {mirrorWidth}</span>
                                <div style={size(mirrorWidth, mirrorHeight)} className='detail'>
                                    {/*<span> {mirrorHeight}</span>*/}
                                    <div className='borderBox'>
                                        <div className='justBorder'>
                                            <div className='lights'>
                                                <div className='topLights'>
                                                    {obj.map(el => {
                                                        let y = []
                                                        if (el[1] > 0 && el[0] === 'top') {
                                                            for (let i = 1; i <= el[1]; i++) {
                                                                y.push(<div className={`${el[0]} light`}/>)
                                                            }
                                                        }
                                                        return (y.map(el => el))
                                                    })}
                                                </div>
                                                <div className='bottomLights'>
                                                    {obj.map(el => {
                                                        let y = []
                                                        if (el[1] > 0 && el[0] === 'bottom') {
                                                            for (let i = 1; i <= el[1]; i++) {
                                                                y.push(<div className={`${el[0]} light`}/>)
                                                            }
                                                        }
                                                        return (y.map(el => el))
                                                    })}</div>
                                                <div className='leftLights'>{obj.map(el => {
                                                    let y = []
                                                    if (el[1] > 0 && el[0] === 'left') {
                                                        for (let i = 1; i <= el[1]; i++) {
                                                            y.push(<div className={`${el[0]} light`}/>)
                                                        }
                                                    }
                                                    return (y.map(el => el))
                                                })}</div>
                                                <div className='rightLights'>{obj.map(el => {
                                                    let y = []
                                                    if (el[1] > 0 && el[0] === 'right') {
                                                        for (let i = 1; i <= el[1]; i++) {
                                                            y.push(<div className={`${el[0]} light`}/>)
                                                        }
                                                    }
                                                    return (y.map(el => el))
                                                })}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {backPlate.width}</span>
                                <div style={size(backPlate.width, backPlate.height)} className='detail'>
                                    <span> {backPlate.height}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sideWalls'>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {outerLeftRightSide.height}</span>
                                <div style={size(outerLeftRightSide.height, outerLeftRightSide.width)} className='detail'>
                                    <span style={spanStyle}> {outerLeftRightSide.width}</span>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {outerTopBottomSide.height}</span>
                                <div style={size(outerTopBottomSide.height, outerTopBottomSide.width)} className='detail'>
                                    <span style={spanStyle}> {outerTopBottomSide.width}</span>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {innerTopBottomSide.height}</span>
                                <div style={size(innerTopBottomSide.height, innerTopBottomSide.width)} className='detail'>
                                    <span style={spanStyle}> {innerTopBottomSide.width}</span>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {innerLeftRightSide.height}</span>
                                <div style={size(innerLeftRightSide.height, innerLeftRightSide.width)} className='detail'>
                                    <span style={spanStyle}> {innerLeftRightSide.width}</span>
                                </div>
                            </div>
                        </div>
                        {
                            mirrorStand && <div className='details'>
                                <div className={'detailsBox'}>
                                    <span> {mirrorStandSize.height}</span>
                                    <div style={size(mirrorStandSize.width, mirrorStandSize.height)} className='detail'>
                                        <span style={spanStyle}> {mirrorStandSize.width}</span>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            }

        </div>

    )
}