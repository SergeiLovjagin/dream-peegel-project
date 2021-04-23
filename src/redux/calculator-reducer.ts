import {InferActionTypes} from "./redux-store";
import {LampsType} from "../components/SettingsPage";

type initialStateType = typeof initialState

const initialState = {
    mirrorWidth: 0,
    mirrorHeight: 0,
    outerLeftRightSide: {
        width: 50,
        height: 0
    },
    outerTopBottomSide: {
        width: 50,
        height: 0
    },
    innerLeftRightSide: {
        width: 100,
        height: 0
    },
    innerTopBottomSide: {
        width: 100,
        height: 0
    },
    mirrorStand: false,
    mirrorStandSize: {
        width: 0,
        height: 0
    },
    lamps: {

        top: 3,
        left: 4,
        right:5,
        bottom: 3
    },
    backPlate: {
        width: 0,
        height: 0
    }

}

type CalculatorACType = InferActionTypes<typeof actions>
export const actions = {
    setMirrorData: (mirrorWidth: number, mirrorHeight: number) => ({type: 'SET-MIRROR-DATA', mirrorWidth, mirrorHeight} as const),
    setStandData: (standWidth: number, standHeight: number, mirrorStand :boolean) => ({type: 'SET-STAND-DATA', standWidth, standHeight, mirrorStand} as const),
    setLampsData: (lamps: LampsType) => ({
        type: 'SET-LAMPS-DATA',
        lamps
    } as const),
}

export const calculator = (state: initialStateType = initialState, action: CalculatorACType): initialStateType => {
    switch (action.type) {
        case 'SET-MIRROR-DATA' : {
            return {
                ...state,
                mirrorHeight: action.mirrorHeight,
                mirrorWidth: action.mirrorWidth,
                outerLeftRightSide: {
                    ...state.outerLeftRightSide, height: action.mirrorHeight
                },
                outerTopBottomSide: {
                    ...state.outerTopBottomSide, height: action.mirrorWidth - 32
                },
                innerLeftRightSide: {
                    ...state.innerLeftRightSide, height: action.mirrorHeight - (16 * 2)
                },
                innerTopBottomSide: {
                    ...state.innerTopBottomSide, height: action.mirrorWidth - (100 * 2) - (16 * 2) - 5
                },
                backPlate: {
                    ...state.backPlate, width: action.mirrorWidth - 6, height: action.mirrorHeight - 6
                }
            }
        }
        case "SET-STAND-DATA": {
            return {
                ...state,
                mirrorStandSize: {
                    ...state.mirrorStandSize, width: action.standWidth, height: action.standHeight
                },
                mirrorStand: action.mirrorStand
            }
        }
        case "SET-LAMPS-DATA": {
            return {
                ...state,
                lamps: action.lamps
            }
        }
        default : {
            return state
        }
    }
}
