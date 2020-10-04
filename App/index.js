import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import Row from './components/Row';
import Button from './components/Button';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
        justifyContent: "flex-end"
    },
    value: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'right',
        marginRight: 20
    }
});

export default function App() {

    const [currentValue, setCurrentValue] = useState("0");
    const [operator, setOperator] = useState("");
    const [previousValue, setPreviousValue] = useState("");

    reset = () => {
        setPreviousValue("");
        setOperator("");
    }

    handleTap = (type, value) => {
        if (type === "number") {
            if (value == "." && currentValue.indexOf(".") >= 0)
                return;
            if (currentValue === "0") setCurrentValue(`${value}`);
            else setCurrentValue(`${currentValue}${value}`);
        }
        else if (type === "operator") {
            setPreviousValue(currentValue);
            setCurrentValue("0");
            setOperator(value);
        }
        else if (type === "equal") {
            switch (operator) {
                case "+":
                    setCurrentValue(parseFloat(previousValue) + parseFloat(currentValue));
                    reset();
                    break;
                case "-":
                    setCurrentValue(parseFloat(previousValue) - parseFloat(currentValue));
                    reset();
                    break;
                case "/":
                    setCurrentValue(parseFloat(previousValue) / parseFloat(currentValue));
                    reset();
                    break;
                case "*":
                    setCurrentValue(parseFloat(previousValue) * parseFloat(currentValue));
                    reset();
                    break;
            }
        }
        else if (type === "reset") {
            setCurrentValue("0")
            setPreviousValue("");
            setOperator("");
        }
        else if (type === "posneg") {
            setCurrentValue(parseFloat(currentValue) * -1);
        }
        else if (type === "perc") {
            setCurrentValue(parseFloat(currentValue) * 0.01);
        }
        return;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <Text style={styles.value}>
                    {parseFloat(currentValue).toLocaleString()}
                </Text>
                <Row>
                    <Button theme="secondary"
                        text="C"
                        onPress={() => handleTap("reset", "0")}
                    />
                    <Button theme="secondary"
                        text="+/-"
                        onPress={() => handleTap("posneg")}
                    />
                    <Button theme="secondary"
                        text="%"
                        onPress={() => handleTap("perc")}
                    />
                    <Button theme="secondary"
                        text="/"
                        onPress={() => handleTap("operator", "/")}
                    />
                </Row>
                <Row>
                    <Button
                        text="7"
                        onPress={() => handleTap("number", 7)}
                    />
                    <Button
                        text="8"
                        onPress={() => handleTap("number", 8)}
                    />
                    <Button
                        text="9"
                        onPress={() => handleTap("number", 9)}
                    />
                    <Button
                        text="*"
                        onPress={() => handleTap("operator", "*")}
                        theme="accent"
                    />
                </Row>
                <Row>
                    <Button
                        text="6"
                        onPress={() => handleTap("number", 6)}
                    />
                    <Button
                        text="5"
                        onPress={() => handleTap("number", 5)}
                    />
                    <Button
                        text="4"
                        onPress={() => handleTap("number", 4)}
                    />
                    <Button
                        text="-"
                        onPress={() => handleTap("operator", "-")}
                        theme="accent"
                    />
                </Row>
                <Row>
                    <Button
                        text="3"
                        onPress={() => handleTap("number", 3)}
                    />
                    <Button
                        text="2"
                        onPress={() => handleTap("number", 2)}
                    />
                    <Button
                        text="1"
                        onPress={() => handleTap("number", 1)}
                    />
                    <Button
                        text="+"
                        onPress={() => handleTap("operator", "+")}
                        theme="accent"
                    />
                </Row>
                <Row>
                    <Button
                        text="0"
                        onPress={() => handleTap("number", 0)}
                    />
                    <Button
                        text="."
                        onPress={() => handleTap("number", ".")}
                    />
                    <Button
                        text="="
                        onPress={() => handleTap("equal")}
                        size="double"
                        theme="accent"
                    />
                </Row>
            </SafeAreaView>
        </View>
    );
}

