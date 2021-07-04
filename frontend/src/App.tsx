import React from 'react';

// api
import { getImage, uploadImage } from './core/api';

const App: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState<string>('');
  const [images, setImages] = React.useState<string[]>([]);

  const submit = async (event: any) => {
    if (!file) return;
    event.preventDefault();

    const result = await uploadImage(file, description);

    setFile(null);
    setDescription('');

    setImages((prev) => [...prev, result]);
  };

  const fileSelected = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      {images.map((image) => (
        <img src={getImage(image)} alt="any" />
      ))}
    </div>
  );
};

export default App;
