import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {singerList: []};
  }

  renderSon = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 100,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
            }}>
            {index + 1}
          </Text>
          <Image
            source={{uri: item.img}}
            style={{height: 90, width: 150, resizeMode: 'stretch'}}
          />
        </View>
        <Text style={{fontSize: 12, textAlign: 'right', width: 180}}>
          {item.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 40,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            <Button
              title="删除"
              onPress={() => {
                this.delIt(item);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  delIt(item) {
    var res = [...this.state.singerList];
    for (let i = 0; i < this.state.singerList.length; i++) {
      if (item.id === this.state.singerList[i].id) {
        res.splice(i, 1);
      }
    }
    this.setState({
      singerList: res,
    });
  }

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          singerList: res,
        });
      });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#eee',
        }}>
        <FlatList
          data={this.state.singerList}
          renderItem={this.renderSon}
          refreshing={false}
          keyExtractor={(item, index) => index.toString()} //key值
          ListEmptyComponent={<Text>歌曲列表为空</Text>}
        />
      </View>
    );
  }
}
export default App;
