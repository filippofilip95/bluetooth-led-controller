import React from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Modal,
} from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import { ColorPicker } from 'react-native-color-picker'

//assets
import { GlobalStyles, Constants } from './assets'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pairedDevices: [],
      cennectedDevice: null,
      connecting: false,
      isModalVisible: false,
      selectedColor: null,
    }
  }
  async componentWillMount() {
    await this.getPairedDevices()
    await this.isBluetoothEnabled()
  }

  isBluetoothEnabled = async () => {
    try {
      const bluetoothState = await BluetoothSerial.isEnabled()
      if (!bluetoothState) {
        Alert.alert(
          'Bluetooth is OFF',
          'Do you want to enable bluetooth?',
          [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => this.enableBluetoothAndRefresh(),
            },
          ],
          { cancelable: false },
        )
      }
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  enableBluetoothAndRefresh = async () => {
    try {
      await BluetoothSerial.enable()
      setTimeout(() => {
        this.getPairedDevices()
      }, 1000)
    } catch (e) {
      console.log(e)
    }
  }

  getPairedDevices = async () => {
    try {
      const pairedDevices = await BluetoothSerial.list()
      this.setState({
        pairedDevices,
      })
    } catch (e) {
      console.log(e)
    }
  }

  connectToDevice = async device => {
    try {
      if (this.isBluetoothEnabled()) {
        this.setState({
          connecting: true,
          connectedDevice: null,
        })
        await BluetoothSerial.connect(device.id)
        this.setState({
          connectedDevice: device,
          connecting: false,
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({
        connecting: false,
      })
      Alert.alert(
        'Connecting failed',
        'Unable to connect to device',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK pressed'),
          },
        ],
        { cancelable: false },
      )
    }
  }

  disconnect = async () => {
    try {
      if (this.isBluetoothEnabled()) {
        this.setState({
          connecting: true,
        })
        await BluetoothSerial.disconnect()
        this.setState({
          connectedDevice: null,
          connecting: false,
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({
        connecting: false,
      })
    }
  }

  toggleLed = async data => {
    try {
      await BluetoothSerial.write(data)
    } catch (e) {
      console.log(e)
    }
  }

  colorChanged = async data => {
    try {
      await BluetoothSerial.write(JSON.stringify(data))
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <ScrollView style={[GlobalStyles.flex1, GlobalStyles.marginTopSml]}>
        <View style={GlobalStyles.materialCard}>
          <Text style={[GlobalStyles.subheading, { fontSize: 20 }]}>
            List of paired devices:
          </Text>
          <TouchableOpacity onPress={this.getPairedDevices}>
            <Text>Refresh</Text>
          </TouchableOpacity>
          <FlatList
            contentContainerStyle={GlobalStyles.paddingTop}
            data={this.state.pairedDevices}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() =>
              <View
                style={[
                  { height: 1, backgroundColor: Constants.BORDER },
                  GlobalStyles.marginVerticalSml,
                ]}
              />}
            renderItem={({ item: device }) =>
              <TouchableOpacity onPress={() => this.connectToDevice(device)}>
                <Text style={GlobalStyles.subheading}>
                  {device.name}
                </Text>
                <Text style={GlobalStyles.body}>
                  {device.id}
                </Text>
              </TouchableOpacity>}
          />
        </View>
        <View style={GlobalStyles.materialCard}>
          {this.state.connecting
            ? <View style={[GlobalStyles.centerAligned, GlobalStyles.padding]}>
                <ActivityIndicator
                  size={'large'}
                  color={Constants.PRIMARY_COLOR}
                />
                <Text style={GlobalStyles.body1}>Connecting...</Text>
              </View>
            : <View>
                <Text style={[GlobalStyles.subheading, { fontSize: 20 }]}>
                  {!!this.state.connectedDevice
                    ? 'Connected to:'
                    : 'Not connected'}
                </Text>
                {!!this.state.connectedDevice &&
                  <Text style={GlobalStyles.body1} onPress={this.disconnect}>
                    disconnect
                  </Text>}
                {!!this.state.connectedDevice &&
                  <View style={GlobalStyles.paddingTopSml}>
                    <Text style={GlobalStyles.subheading}>
                      {this.state.connectedDevice.name}
                    </Text>
                    <Text style={GlobalStyles.body}>
                      {this.state.connectedDevice.id}
                    </Text>
                  </View>}
              </View>}
          {!!this.state.connectedDevice &&
            <View style={GlobalStyles.paddingTop}>
              <View style={GlobalStyles.paddingBottomSml}>
                <Button
                  title={'TURN ON LED'}
                  color={Constants.PRIMARY_COLOR}
                  onPress={() => this.toggleLed('1')}
                />
              </View>
              <View style={GlobalStyles.paddingBottomSml}>
                <Button
                  title={'TURN OFF LED'}
                  color={Constants.PRIMARY_COLOR}
                  onPress={() => this.toggleLed('0')}
                />
              </View>
              <View style={GlobalStyles.paddingBottomSml}>
                <Button
                  title={'PICK COLOR'}
                  color={Constants.PRIMARY_COLOR}
                  onPress={() =>
                    this.setState({
                      isModalVisible: true,
                    })}
                />
              </View>
            </View>}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.setState({
              isModalVisible: false,
            })
          }}
        >
          <View style={GlobalStyles.flex1}>
            <Text style={[GlobalStyles.title, GlobalStyles.textCenterAligned]}>
              Pick your own color
            </Text>
            <ColorPicker
              onColorSelected={color => alert(`Color selected: ${color}`)}
              style={GlobalStyles.flex1}
              onColorChange={color => this.colorChanged(color)}
            />
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
