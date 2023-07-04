import * as React from 'react';
import { useState } from 'react';

import {
Text,
View,
StyleSheet,
TextInput,
TouchableOpacity,
StatusBar,
Modal,
} from 'react-native';

export default function HomeScreen({ navigation, route }) {

// All States
const [originalPrice, setOriginalPrice] = useState('');
const [discountPrc, setDicountPrc] = useState('');
const [savedAmount, setSavedAmount] = useState('0.00');
const [finalPrice, setFinalPrice] = useState('0.00');
const [calError, setCalError] = useState('');
const [history, setHistory] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [saveBtnState, setSaveBtnState] = useState(true);

const calculateDiscount = () => {
if (originalPrice != '' && discountPrc != '') {
if (discountPrc <= 100 && originalPrice >= 0 && discountPrc >= 0) {
var saved = (originalPrice * discountPrc) / 100;
var final_Price = originalPrice - saved;
setSavedAmount(saved.toFixed(2));
setFinalPrice(final_Price.toFixed(2));
setCalError('');
} else if (discountPrc > 100) {
setCalError('Discount must be less than 100%');
} else if (originalPrice < 0) {
setCalError('Original Price must be Greater than 0');
} else if (discountPrc < 0) {
setCalError('Discount% must be Greater than 0');
}
} else {
setCalError('Empty Field(s) Found!');
}
};

const saveResult = () => {
if (originalPrice != '' || discountPrc != '') {
const resultObj = {
id: Math.random().toString(),
original_Price: originalPrice,
discount_Percentage: discountPrc,
final_Price_Var: finalPrice,
};

setHistory((oldHistory) => [...oldHistory, resultObj]);
setOriginalPrice('');
setDicountPrc('');
setSaveBtnState(true);
setFinalPrice('0.00');
setSavedAmount('0.00');
setModalVisible(true);
}
};

return (
<View style={styles.container}>
<View style={{ marginTop: 100 }} />
<Text style={[styles.heading, { fontFamily: 'Pacifico' }]}>
Discount Calculator
</Text>
<View style={{ marginTop: 60 }} />

{/* Output Results */}
<View style={{ flexDirection: 'row' }}>
<Text style={styles.resultText}>Final Price :</Text>
<Text style={styles.finalPriceText}> Rs {finalPrice}</Text>
</View>
<View style={{ flexDirection: 'row' }}>
<Text style={styles.resultText}>You Saved :</Text>
<Text style={[styles.finalPriceText, { color: '#33bf5c' }]}>
{' '}
Rs {savedAmount}
</Text>
</View>

{/* Result Saved Modal */}
<Modal animationType="fade" transparent={true} visible={modalVisible}>
<View style={styles.centeredView}>
<View style={styles.modalView}>
<Text style={styles.modalText}>Result Saved in History :)</Text>
<View style={{ paddingTop: 20 }} />
<TouchableOpacity
style={[styles.modalBtn, { backgroundColor: '#33bf5c' }]}
onPress={() => {
setModalVisible(!modalVisible);
}}>
<Text style={styles.textStyle}>OK</Text>
</TouchableOpacity>
</View>
</View>
</Modal>

<View style={{ marginTop: 10 }} />
<Text style={{ fontSize: 15, color: '#E74C3C' }}>{calError}</Text>
<View style={{ marginTop: 10 }} />

{/* Text Fields */}
<TextInput
keyboardType={'number-pad'}
value={originalPrice}
onChangeText={(orgPrice) => {
orgPrice == '' || discountPrc == ''
? setSaveBtnState(true)
: setSaveBtnState(false);
setOriginalPrice(orgPrice);
}}
style={styles.textFields}
placeholder={'Original Price'}
placeholderTextColor="#b5c1c6"
/>
<View style={{ paddingTop: 10 }} />
<TextInput
value={discountPrc}
keyboardType={'number-pad'}
onChangeText={(discountPercentage) => {
discountPercentage == '' || originalPrice == ''
? setSaveBtnState(true)
: setSaveBtnState(false);
setDicountPrc(discountPercentage);
}}
style={styles.textFields}
placeholder={'Discount %'}
placeholderTextColor="#b5c1c6"
/>
<View style={{ paddingTop: 20 }} />

<TouchableOpacity
onPress={() => calculateDiscount()}
style={styles.calcBtn}>
<Text style={styles.calcBtnText}>Calculate</Text>
</TouchableOpacity>

<View style={{ paddingTop: 20 }} />

<TouchableOpacity
disabled={saveBtnState}
onPress={() => saveResult()}
style={[
styles.saveBtn,
saveBtnState == true
? {
borderColor: '#305746',
}
: {
borderColor: '#33bf5c',
},
]}>
<Text
style={[
styles.saveBtnText,
saveBtnState == true
? {
color: 'gray',
}
: {
color: '#b5c1c6',
},
]}>
Save Result
</Text>
</TouchableOpacity>

<View style={{ paddingTop: 80 }} />

<TouchableOpacity
onPress={() =>
navigation.navigate('History', {
historyObject: history,
})
}
style={styles.historyBtn}>
<Text style={styles.historyBtnText}>View History</Text>
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
backgroundColor: 'black',
},
heading: {
color: 'white',
fontSize: 32,
fontWeight: '100',
letterSpacing: 2,
fontFamily: 'Pacifico',
},
textFields: {
height: 50,
width: 280,
borderColor: '#b5c1c6',
borderWidth: 1,
paddingLeft: 10,
fontSize: 15,
borderRadius: 10,
color: 'white',
},
calcBtn: {
height: 50,
width: 200,
backgroundColor: '#33bf5c',
alignItems: 'center',
justifyContent: 'center',
borderRadius: 5,
elevation: 2,
},
calcBtnText: {
fontSize: 20,
color: 'white',
},
saveBtn: {
height: 40,
width: 200,
borderColor: '#33bf5c',
alignItems: 'center',
justifyContent: 'center',
borderRadius: 5,
borderWidth: 1,
},
saveBtnText: {
fontSize: 18,
color: 'white',
},
historyBtn: {
alignItems: 'center',
justifyContent: 'center',
borderColor: '#33bf5c',
borderWidth: 1,
borderRadius: 10,
height: 30,
width: 100,
},
historyBtnText: {
fontSize: 13,
color: '#b5c1c6',
},
resultText: {
fontSize: 25,
color: '#b5c1c6',
},
finalPriceText: {
fontSize: 25,
fontWeight: 'bold',
color: 'white',
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 10,
padding: 20,
alignItems: 'center',
justifyContent: 'center',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
width: 300,
height: 180,
},
modalText: {
textAlign: 'center',
fontSize: 20,
fontFamily: 'Pacifico',
},
modalBtn: {
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#E74C3C',
borderRadius: 5,
padding: 10,
width: 180,
height: 40,
},
centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
textStyle: {
color: 'white',
},
});
