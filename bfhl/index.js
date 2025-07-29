const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = "vanshika_kamra";
const DOB = "21082003";
const EMAIL = "vanshikamra0@gmail.com";
const ROLL_NO = "finding......";

function processData(data) {
    let even = [];
    let odd = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let rawAlpha = "";

    data.forEach(item => {
        if (/^\d+$/.test(item)) {
            let num = parseInt(item);
            sum += num;
            (num % 2 === 0 ? even : odd).push(item);
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
            rawAlpha += item;
        } else {
            specialChars.push(item);
        }
    });

    let reversedConcat = rawAlpha
        .split("")
        .reverse()
        .map((ch, i) =>
            i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
        )
        .join("");

    return {
        is_success: true,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NO,
        odd_numbers: odd,
        even_numbers: even,
        alphabets,
        special_characters: specialChars,
        sum: sum.toString(),
        concat_string: reversedConcat
    };
}

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) throw new Error("Invalid data");
        const result = processData(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ is_success: false, message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
