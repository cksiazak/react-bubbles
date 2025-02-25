import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const newColorDefault = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(newColorDefault);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => (color.id !== colorToEdit.id ? color : res.data))
        );
        setEditing(false);
      })
      .catch(err => {
        console.warn(err);
        setEditing(false);
      });
  };

  const deleteColor = colorToDelete => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(() => {
        updateColors(colors.filter(color => color.id !== colorToDelete.id));
      })
      .catch(err => console.warn(err));
  };

  const addColorChange = color => {
    setNewColor(color);
  };

  const addColorSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        updateColors(res.data);
        setNewColor(newColorDefault);
      })
      .catch(err => console.warn(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
        {/* NEW COLOR */}
        <form onSubmit={addColorSubmit}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              type="text"
              onChange={e =>
                addColorChange({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              type="text"
              onChange={e =>
                addColorChange({ ...newColor, code: { hex: e.target.value } })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
          </div>
        </form>
        {/* NEW COLOR */}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
