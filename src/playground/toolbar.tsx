// custom imports
import { selector } from "./state"
import { segmentMesh } from "./api"
import { playgroundToolType } from "./types"
import { usePlaygroundStore } from "./state/store"

// static data
import playgroundData from "../assets/data/playground.json"

// third party
import { useShallow } from "zustand/shallow"
import { useParams } from "react-router-dom"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PlaygroundToolbarProps = JSX.IntrinsicElements["div"] & {
    
}
export function PlaygroundToolbar({...props}: PlaygroundToolbarProps) {
    const params = useParams()

    const uid = params.uid
    const { selected, title, tool: selectedTool, setTool, setMode, setLoading } = usePlaygroundStore(useShallow(selector))
    
    return (
        <div className="playground-toolbar">
            {Object.entries(playgroundData.toolbar).map(([type, tool]) => {
                return (
                    <button 
                        disabled={tool.disabled}
                        key={`${type}-create-btn`}
                        className={`icon-button ${tool.disabled ? "disabled" : ""} ${selectedTool.type === type ? "active" : ""}`} 
                        onClick={() => {
                            setTool({type: type, settings: tool.settings} as playgroundToolType)

                            if (tool.wireframeOnly) {
                                setMode("wireframe")
                            }

                            switch (type) {
                                case "segment":
                                    if (uid && selected) {
                                        setLoading({on: true, progressText: `Segmenting ${title}...`})
                                        // segmentMesh(uid, selected)
                                        setLoading({on: false, progressText: ""})
                                    }
                                    break
                                default:
                                    break
                            }
                        }}
                    >
                        <FontAwesomeIcon key={type} icon={tool.icon as IconProp} />
                        <span className="tooltip">{tool.tooltip}</span>
                    </button>
                )
            })}
        </div>
    )
}
