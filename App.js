import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import { Audio } from 'expo-av'


export default class App extends React.Component {

    constructor(props)
    {
      super(props);
    //   this.onEndReachedCalledDuringMomentum = true;

    }

    // onEndReached = ({ distanceFromEnd }) => {
    //     console.log("scroll is calling")
    //     if(!this.onEndReachedCalledDuringMomentum){
    //         this.addListPlay;
    //         this.onEndReachedCalledDuringMomentum = true;
    //     }
    // }


    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
    };
    
    onListsReceived = (todoList) => {
      console.log(todoList)
    }

    async componentDidMount() {
      
      
        firebase = new Fire((error, user) => {
            if (error) {
                return alert("Uh oh, something went wrong");
            }
           
            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false });
                });
            });

            this.setState({ user });
        });

    }
    componentWillUnmount() {
        firebase.detach();
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    togglePlaying() {

        this.setState({ shouldPlay: !this.state.shouldPlay });
    }

    renderList = list => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    addList = list => {
        firebase.addList({
          name: list.name,
          color: list.color,
          todos: []
        })
    };

    updateList = list => {
      firebase.updateList(list); 
    };
   
    componentWillUnmount() {
      
        console.log('Component is unmounting.');
        
    }

    addListPlay = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              require('./assets/fork_media_warfare_arrow_pass_by.mp3'),
              { shouldPlay: true }
            );
            // console.log("this is working.")
          } catch (error) {
           console.log("sound error", error)
          }

    }

    scrollPlay = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              require('./assets/zapsplat_cartoon_blink_shake_flutter_high_pitched_003_47921.mp3'),
              { shouldPlay: true }
            );
            // console.log("this is working.")
          } catch (error) {
           console.log("sound error", error)
          }

    }

    

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            );
        }

        
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>
               
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        Covid <Text style={{ fontWeight: "300", color: colors.blue }}>Care</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    <TouchableOpacity 
                        style={styles.addList} 
                        onPress={() => {this.toggleAddTodoModal(); this.addListPlay(); }}>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>

                    <Text style={styles.add}>Add List</Text>
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}
                        onMomentumScrollBegin={() => this.scrollPlay()}
                        
                        
                        
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8
    }
});