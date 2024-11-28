import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import RoundBtn from '@/app/components/RoundBtn';
import Dropdown from '@/app/components/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';


const Page = () => {
  const {balance,runTransaction,transactions,clearTransactions}=useBalanceStore(); // current amount of balance

  const onAddMoney=()=>{
    console.log("Adding money...");
    runTransaction({
      id:Math.random().toString(),
      amount:Math.floor(Math.random()*1000)*(Math.random()>0.5?1:-1),
      date:new Date(),
      title:'Added Money',
    })
  }

  return (
    <ScrollView style={{backgroundColor:Colors.background}}>
      <View style={styles.account}>
        <View style={styles.row}>
        <Text style={styles.balance}>{balance()}</Text>
        <Text style={styles.currency}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
        <RoundBtn icon={'refresh'} text={'Exchange'} />
        <RoundBtn icon={'list'} text={'Details'}  />
        <Dropdown/>
      </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  account:{
    margin:80,
    alignItems:'center',

  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  balance:{
    fontSize:50,
    fontWeight:'bold',
  },
  currency:{
    fontSize:20,
    fontWeight:'500',
    marginLeft:5,
  },
  actionRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
  }
})



export default Page