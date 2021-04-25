import React from "react";
import {settingsPageSelector} from "../selectors/settings-page-selector";
import {useSelector} from "react-redux";
import {Button} from "antd";
import {NavLink} from "react-router-dom";

export const Save = () => {
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
        lamps,
        backDetails
    } = useSelector(settingsPageSelector)

    const spanStyle = mirrorWidth < 1000 ? {marginRight: '-30px'} : {marginRight: '-40px'}
    const lengthBetweenLightsRight = ((mirrorHeight - 100) / (lamps.right - 1))
    const lengthBetweenLightsTop = ((mirrorWidth - 100) / (lamps.top - 1))

    const size = (width: number, height: number) => ({width: width / 3, height: height / 3, border: '1px solid'})
    const createBackDetails = (detail: { width: number, height: number }, value: number) => {
        return (
            <div className={'detailsBox'}>
                <span> {detail.height}</span>
                <div style={size(detail.height, detail.width)} className='detail'>
                    <span style={spanStyle}> {detail.width}</span>
                    <div className={'detailContainer'}>
                        {value + 'x'}
                    </div>
                </div>

            </div>
        )
    }
    const createLights = (lampsSide: 'left' | 'right' | 'top' | 'bottom') => {
        let obj = Object.entries(lamps)
        return (
            <div className={lampsSide}>
                {obj.map(el => {
                    let y = []
                    if (el[1] > 0 && el[0] === lampsSide) {
                        for (let i = 1; i <= el[1]; i++) {
                            y.push(<div className={`light`}/>)
                        }
                    }
                    return (y.map(el => el))
                })}
            </div>
        )
    }

    return (
        <div className='container'>
            {
                mirrorHeight !== 0 &&
                <>
                    <div className='mirror'>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <p>50</p>
                                <p>50</p>
                                <p>50</p>
                                <p>50</p>
                                <span> {mirrorWidth}</span>
                                <div style={size(mirrorWidth, mirrorHeight)} className='detail'>
                                    <div className='borderBox'>
                                        <span> {mirrorHeight}</span>
                                        <span className='lengthBetweenLightsRight'>
                                            {
                                                lengthBetweenLightsRight % 1 === 0
                                                    ? lengthBetweenLightsRight
                                                    : lengthBetweenLightsRight.toFixed(2)
                                            }
                                        </span>
                                        <span className='lengthBetweenLightsTop'>
                                            {
                                                lengthBetweenLightsTop % 1 === 0
                                                    ? lengthBetweenLightsTop
                                                    : lengthBetweenLightsTop.toFixed(2)
                                            }
                                        </span>
                                        <span className='holeWidth'> Q29</span>
                                        <div className='lights'>
                                            {createLights('top')}
                                            {createLights('bottom')}
                                            {createLights('left')}
                                            {createLights('right')}
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
                    {createBackDetails(outerLeftRightSide, backDetails.innerLeftRightValue)}
                    {createBackDetails(outerTopBottomSide, backDetails.outerTopBottomValue)}
                    {createBackDetails(innerTopBottomSide, backDetails.innerTopBottomValue)}
                    {createBackDetails(innerLeftRightSide, backDetails.innerLeftRightValue)}
                    {mirrorStand && createBackDetails(mirrorStandSize, backDetails.mirrorStandValue)}
                </>
            }
            <div className='savePageButtons'>
                <NavLink className='saveButton' to={'/save'}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </NavLink>
                <NavLink className='backButton' to={'/'}>
                    <Button type="primary" htmlType="submit">
                        Back
                    </Button>
                </NavLink>
            </div>
        </div>

    )
}
//
// <div className={'detailContainer'}>
//     {backDetails.outerTopBottomValue + 'x'}
// </div>