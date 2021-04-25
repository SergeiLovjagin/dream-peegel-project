import {Button, Col, Form, InputNumber, Row, Switch} from "antd";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/calculator-reducer";
import {Project} from "./Project";
import {settingsPageSelector} from "../selectors/settings-page-selector";

export const SettingsPage = React.memo(() => {
    const {
        mirrorHeight,
        mirrorWidth,
        lamps,
    } = useSelector(settingsPageSelector)
    const dispatch = useDispatch()

    const [mirrorStand, setMirrorStand] = useState(false)
    const [showProject, setShowProject] = useState(false)

    const onChangeShow = () => setShowProject(false)
    const onStandChange = () => setMirrorStand(!mirrorStand)

    const onFinish = (values: any) => {
        setShowProject(true)
        const {mirrorWidth, mirrorHeight, mirrorStand, right, top, bottom, left, mirrorStandSizeWidth, mirrorStandSizeHeight} = values
        dispatch(actions.setMirrorData(mirrorWidth, mirrorHeight))
        dispatch(actions.setStandData(mirrorStandSizeWidth, mirrorStandSizeHeight, mirrorStand))
        dispatch(actions.setLampsData({left, top, right, bottom}))
    };

    const createLightsFormInput = (name: string) => {
        return (
            <Col>
                <Form.Item label={name +  ' bulbs'}>
                    <Form.Item name={name} noStyle>
                        <InputNumber onChange={onChangeShow} min={2} max={15} style={{width: '60px'}}/>
                    </Form.Item>
                </Form.Item>
            </Col>
        )
    }
    const createInputForm = (label: string, name: string) => {
       let min = 0
        if(name === 'mirrorWidth' || name === 'mirrorHeight') {
            min = 400
        } else {
            min = 100
        }
        return (
            <Col style={{marginRight: '20px'}}>
                <Form.Item label={label} name={name} rules={[
                    {
                        required: true,
                        message: 'Required',
                    },]}>
                    <InputNumber onChange={onChangeShow} min={min} style={{width: 100}}/>
                </Form.Item>
            </Col>
        )
    }
    return (
        <div>
            <Form
                layout="horizontal"
                style={{
                    width: '100%',
                }}
                name="basic"
                initialValues={{
                    mirrorHeight: `${mirrorHeight}`,
                    mirrorWidth: `${mirrorWidth}`,
                    mirrorStand: mirrorStand,
                    mirrorStandSizeHeight: 100,
                    mirrorStandSizeWidth: 100,
                    left: `${lamps.left}`,
                    top: `${lamps.top}`,
                    right: `${lamps.right}`,
                    bottom: `${lamps.bottom}`
                }}
                onFinish={onFinish}
            >
                {/*MIRROR SIZE*/}
                <Row justify='center' style={{margin: '20px 20px 20px', height: '40px'}}>
                    {createInputForm('Mirror width in mm', 'mirrorWidth')}
                    {createInputForm('Mirror height in mm', 'mirrorHeight')}
                </Row>

                {/*    /!*STAND SIZE FORM*!/*/}
                <Row justify="center" style={{margin: '20px', height: '40px'}}>
                    <Col style={{marginRight: '20px'}}>
                        <Form.Item name="mirrorStand" label="Mirror stand" valuePropName="checked">
                            <Switch onChange={onChangeShow} onClick={onStandChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                {mirrorStand &&
                <Row justify="center" style={{margin: '20px', height: '40px'}}>
                    {createInputForm('Stand width', 'mirrorStandSizeWidth')}
                    {createInputForm('Stand height', 'mirrorStandSizeHeight')}
                </Row>
                }

                {/*LIGHTS FORM*/}
                <Row justify="center" style={{margin: '20px', height: '40px'}}>
                    {createLightsFormInput('left')}
                    {createLightsFormInput('top')}
                    {createLightsFormInput('right')}
                    {createLightsFormInput('bottom')}
                </Row>
                <Row justify="center" style={{margin: '30px'}}>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {showProject && <Project/>}
        </div>
    )
})