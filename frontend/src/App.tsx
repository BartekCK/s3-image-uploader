import React from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState<string>('');

  const postImage = async (image: File, description: string) => {
    const formData = new FormData();

    formData.append('image', image);
    formData.append('description', description);

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  };

  const submit = async (event: any) => {
    if (!file) return;
    event.preventDefault();

    const result = await postImage(file, description);
    console.log(result);
  };

  const fileSelected = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
