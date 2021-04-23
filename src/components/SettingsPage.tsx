import {Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {actions} from "../redux/calculator-reducer";

export type LampsType = {
    left: number, top: number, right: number, bottom: number,
}

export const SettingsPage = React.memo(() => {
        const [stand, setStand] = useState(false)
        const dispatch = useDispatch()

        const onStandChange = () => {
            setStand(!stand)
        }

        return (
            <div>
                <Formik
                    initialValues={{
                        mirrorHeight: 0,
                        mirrorWidth: 0,
                        mirrorStand: false,
                        mirrorStandSize: {
                            height: 0,
                            width: 0
                        },
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    }}
                    onSubmit={data => {

                        const {mirrorWidth, mirrorHeight, mirrorStand, mirrorStandSize, right , top, bottom, left} = data
                        const lamps = {left, top,right, bottom}

                        dispatch(actions.setMirrorData(mirrorWidth, mirrorHeight))
                        dispatch(actions.setStandData(mirrorStandSize.width, mirrorStandSize.height, mirrorStand))
                        dispatch(actions.setLampsData(lamps))
                    }}>

                    {() => (

                        <Form>
                            {/*MIRROR SIZE FORM*/}
                            Width
                            <Field type='number'
                                   name='mirrorWidth'
                                   placeholder='Mirror width in millimeters'/>
                            Height
                            <Field type='number'
                                   name='mirrorHeight'
                                   placeholder='Mirror height in millimeters'/>
                            <Field type='checkbox'
                                   name='mirrorStand'
                                   onClick={onStandChange}
                            />
                            {/*STAND SIZE FORM*/}
                            {
                                stand &&
                                <div>
                                    <Field type='number'
                                           name={'mirrorStandSize[width]'}
                                           placeholder='Stand width'/>
                                    <Field type='number'
                                           name={'mirrorStandSize[height]'}
                                           placeholder='Stand height'/>
                                </div>
                            }
                            {/*LAMPS FORM*/}
                            <div>
                                <Field type='number'
                                       name='left'
                                       placeholder='left'/>
                                <Field type='number'
                                       name='top'
                                       placeholder='top'
                                />
                                <Field type='number'
                                       name='right'
                                       placeholder='right'
                                />
                                <Field type='number'
                                       name='bottom'
                                       placeholder='bottom'
                                />
                            </div>
                            <button type='submit'>Calculate</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
)