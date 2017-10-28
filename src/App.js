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
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import NavigationBar from 'react-native-navbar'

//assets
import { GlobalStyles, Constants } from './assets'

//utils
import { convertHexToRgbString } from './utils'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pairedDevices: [],
      connectedDevice: null,
      connecting: false,
      isModalVisible: false,
      selectedColor: null,
    }
  }

  async componentWillMount() {
    await this.getPairedDevices()
    await this.isBluetoothEnabled()
  }

  componentDidMount() {
    BluetoothSerial.on('bluetoothDisabled', this.isBluetoothEnabled)
  }

  componentWillUnmount() {
    BluetoothSerial.removeListener('bluetoothDisabled')
  }

  isBluetoothEnabled = async () => {
    try {
      const bluetoothState = await BluetoothSerial.isEnabled()
      if (!bluetoothState) {
        this.setState({
          connectedDevice: null,
        })
        Alert.alert(
          'Bluetooth is disabled',
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

  connectToDevice = async device => {
    const { connectedDevice } = this.state
    const connectedDeviceId = connectedDevice && connectedDevice.id
    if (!this.state.connecting) {
      if (device.id === connectedDeviceId) {
        alert('Already connected to this device.')
      } else {
        try {
          this.setState({
            connecting: true,
            connectedDevice: null,
          })
          await BluetoothSerial.connect(device.id)
          this.setState({
            connectedDevice: device,
            connecting: false,
          })
        } catch (e) {
          console.log(e)
          this.setState({
            connectedDevice: null,
            connecting: false,
          })
          alert('Unable to connect to this device')
        }
      }
    }
  }

  disconnect = async () => {
    if (!this.state.connecting) {
      try {
        this.setState({
          connecting: true,
        })
        await BluetoothSerial.disconnect()
        this.setState({
          connectedDevice: null,
          connecting: false,
        })
      } catch (e) {
        console.log(e)
        this.setState({
          connecting: false,
        })
      }
    }
  }

  sendStringToDevice = async data => {
    try {
      await BluetoothSerial.write(data)
      this.setState({
        selectedColor: null,
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleColorChange = color => {
    const hexColor = fromHsv(color)
    this.setState({ selectedColor: hexColor })
    this.setColor(hexColor)
  }

  setColor = async color => {
    try {
      await BluetoothSerial.write(convertHexToRgbString(color))
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={GlobalStyles.flex1}>
        <NavigationBar
          tintColor={Constants.PRIMARY_COLOR}
          title={{
            title: 'RGB LED Controller',
            tintColor: Constants.WHITE,
          }}
        />
        <ScrollView style={GlobalStyles.paddingTopSml}>
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
              ? <View
                  style={[GlobalStyles.centerAligned, GlobalStyles.padding]}
                >
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
                    <View style={GlobalStyles.paddingTopSml}>
                      <Text style={GlobalStyles.subheading}>
                        {this.state.connectedDevice.name}
                      </Text>
                      <Text style={GlobalStyles.body}>
                        {this.state.connectedDevice.id}
                      </Text>
                      <Text
                        style={GlobalStyles.body1}
                        onPress={this.disconnect}
                      >
                        Disconnect
                      </Text>
                      {!!this.state.selectedColor &&
                        <View
                          style={{
                            position: 'absolute',
                            top: 15,
                            right: 15,
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            backgroundColor: this.state.selectedColor,
                          }}
                        />}
                    </View>}
                </View>}
            {!!this.state.connectedDevice &&
              <View style={GlobalStyles.paddingTop}>
                <View style={GlobalStyles.paddingBottomSml}>
                  <Button
                    title={'TURN ON LED'}
                    color={Constants.PRIMARY_COLOR}
                    onPress={() => this.sendStringToDevice('999,')}
                  />
                </View>
                <View style={GlobalStyles.paddingBottomSml}>
                  <Button
                    title={'TURN OFF LED'}
                    color={Constants.PRIMARY_COLOR}
                    onPress={() => this.sendStringToDevice('998,')}
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
              <NavigationBar
                tintColor={Constants.PRIMARY_COLOR}
                title={{
                  title: 'Pick Color',
                  tintColor: Constants.WHITE,
                }}
              />
              <View
                style={[
                  GlobalStyles.materialCard,
                  GlobalStyles.flex1,
                  GlobalStyles.marginTopSml,
                ]}
              >
                <ColorPicker
                  style={GlobalStyles.flex1}
                  onColorChange={this.handleColorChange}
                  color={this.state.selectedColor}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}
