import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useState, useEffect} from 'react';

export const baseUrl = 'https://media.mw.metropolia.fi/wbma';

const loadMedia = async (id = '') => {
  const res = await fetch(`${baseUrl}/media/${id}`);
  const json = await res.json();
  return json;
};

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    try {
      loadMedia().then((json) => {
        Promise.all(
          json.map(async (item) => await loadMedia(item.file_id))
        ).then((json) => setMediaArray(json));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
