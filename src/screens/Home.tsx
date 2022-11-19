import { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center} from 'native-base';
import {SignOut, ChatTeardropText} from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import {Filter} from '../components/Filter';
import {Order, OrderProps} from '../components/Order';
import { Button } from '../components/Button';

export const  Home = ()=>{
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '30101991041112',
            when: '16/11/22 às 10:39',
            status: 'closed'
        },
        {
            id: '133',
            patrimony: '23031969041112',
            when: '17/11/22 às 20:30',
            status: 'open'
        },
        {
            id: '143',
            patrimony: '25091998041112',
            when: '18/11/22 às 09:54',
            status: 'open'
        },
        {
            id: '153',
            patrimony: '04121973041112',
            when: '18/11/22 às 15:24',
            status: 'open'
        },
        {
            id: '163',
            patrimony: '04112000041112',
            when: '18/11/22 às 16:54',
            status: 'open'
        },
    ]);
    const navigation = useNavigation();
    const {colors} = useTheme();

    function handleNewOrder(){
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string){
        navigation.navigate('details', {orderId})
    }

    return(
        <VStack flex={1} pb={6} bg='gray.700'>
            <HStack
                w="full"
                justifyContent='space-between'
                alignItems='center'
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />

                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]}/>}
                />

            </HStack>

            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>
                        Meus Chamados
                    </Heading>
                    <Text color="gray.300">
                        3
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                        type='open'
                        title='Em andamento'
                        onPress={()=> setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />

                    <Filter 
                        type='closed'
                        title='Finalizados'
                        onPress={()=> setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> <Order data={item} onPress={()=> handleOpenDetails(item.id)}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:100}}
                    ListEmptyComponent={()=>(
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40}/>
                            <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                                Você ainda não possui {'\n'} 
                                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />

                <Button onPress={handleNewOrder} title="Nova Solicitação" />
            </VStack>
        </VStack>
    )
}