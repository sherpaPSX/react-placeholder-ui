import { IconButton, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { DrawItemFunctions } from "../../functions/drawItemFunctions";
import { AppContextProps, DrawItemProps } from "../../models/Interfaces";

export default function ItemToolbar(props: DrawItemProps) {
  const { elements, setSelectedElement, setElements } =
    useContext<AppContextProps>(AppContext);

  const methods = new DrawItemFunctions(
    elements,
    setElements,
    setSelectedElement
  );

  const el = props;

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Element width"
        variant="filled"
        type="number"
        size="small"
        placeholder="Element width"
        value={el.width}
        onChange={(ev) =>
          methods.onUpdate({
            ...el,
            width: parseInt(ev.target.value),
          })
        }
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Element height"
        variant="filled"
        type="number"
        size="small"
        placeholder="Element height"
        value={el.height}
        onChange={(ev) =>
          methods.onUpdate({
            ...el,
            height: parseInt(ev.target.value),
          })
        }
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Position X"
        variant="filled"
        type="number"
        size="small"
        placeholder="Position X"
        value={el.posX}
        onChange={(ev) =>
          methods.onUpdate({
            ...el,
            posX: parseInt(ev.target.value),
          })
        }
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Position Y"
        variant="filled"
        type="number"
        size="small"
        placeholder="Position Y"
        value={el.posY}
        onChange={(ev) =>
          methods.onUpdate({
            ...el,
            posY: parseInt(ev.target.value),
          })
        }
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />
      {!el.isCircle && (
        <TextField
          id="outlined-basic"
          label="Rounded corners"
          variant="filled"
          type="number"
          size="small"
          placeholder="Rounded corners"
          value={el.rounded}
          onChange={(ev) =>
            methods.onUpdate({
              ...el,
              rounded: parseInt(ev.target.value),
            })
          }
          sx={{ backgroundColor: "white", marginRight: 2 }}
        />
      )}
      <Tooltip title="Clone element">
        <IconButton
          aria-label="Clone element"
          sx={{ color: "common.white" }}
          onClick={() => methods.onClone({ ...props })}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete element">
        <IconButton
          aria-label="Delete element"
          sx={{ color: "common.white" }}
          onClick={(e) => {
            e.preventDefault();
            methods.onDelete(el.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
