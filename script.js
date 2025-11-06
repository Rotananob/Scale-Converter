
        // ការកំណត់ទិន្នន័យខ្នាត
        const units = {
            length: {
                name: "ប្រវែង",
                units: [
                    { name: "មីលីម៉ែត្រ", factor: 0.001 },
                    { name: "សង់ទីម៉ែត្រ", factor: 0.01 },
                    { name: "ម៉ែត្រ", factor: 1 },
                    { name: "គីឡូម៉ែត្រ", factor: 1000 },
                    { name: "អ៊ិន្ឈ", factor: 0.0254 },
                    { name: "ហ្វីត", factor: 0.3048 },
                    { name: "យ៉ាត", factor: 0.9144 },
                    { name: "ម៉ាយ", factor: 1609.344 }
                ]
            },
            weight: {
                name: "ទំងន់",
                units: [
                    { name: "មីលីក្រាម", factor: 0.001 },
                    { name: "ក្រាម", factor: 1 },
                    { name: "គីឡូក្រាម", factor: 1000 },
                    { name: "ផោន", factor: 453.592 },
                    { name: "អោន", factor: 28349.5 }
                ]
            },
            temperature: {
                name: "សីតុណ្ហភាព",
                units: [
                    { name: "សេលស្យឺស", factor: 1, offset: 0 },
                    { name: "ផារ៉ិនហៃ", factor: 5/9, offset: -32 },
                    { name: "ខេវីន", factor: 1, offset: 273.15 }
                ]
            },
            volume: {
                name: "បរិមាណ",
                units: [
                    { name: "មីលីលីត្រ", factor: 0.001 },
                    { name: "លីត្រ", factor: 1 },
                    { name: "ម៉ែត្រគូប", factor: 1000 },
                    { name: "ហ្គាឡុង (អាមេរិក)", factor: 3.78541 },
                    { name: "អ៊ីនឈ៍គូប", factor: 0.0163871 }
                ]
            }
        };

        // ការជ្រើសរើសធាតុ DOM
        const converterBtns = document.querySelectorAll('.converter-btn');
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        const valueInput = document.getElementById('value');
        const convertBtn = document.getElementById('convert-btn');
        const resultDiv = document.getElementById('result');
        const swapBtn = document.getElementById('swap-btn');

        let currentType = 'length';

        // បង្កើតជម្រើសខ្នាត
        function populateUnitOptions(type) {
            fromUnitSelect.innerHTML = '';
            toUnitSelect.innerHTML = '';
            
            units[type].units.forEach(unit => {
                const fromOption = document.createElement('option');
                fromOption.value = unit.name;
                fromOption.textContent = unit.name;
                fromUnitSelect.appendChild(fromOption);
                
                const toOption = document.createElement('option');
                toOption.value = unit.name;
                toOption.textContent = unit.name;
                toUnitSelect.appendChild(toOption);
            });
            
            // កំណត់ខ្នាតដើម និងខ្នាតគោលដៅ
            if (type === 'length') {
                fromUnitSelect.value = 'ម៉ែត្រ';
                toUnitSelect.value = 'ហ្វីត';
            } else if (type === 'weight') {
                fromUnitSelect.value = 'គីឡូក្រាម';
                toUnitSelect.value = 'ផោន';
            } else if (type === 'temperature') {
                fromUnitSelect.value = 'សេលស្យឺស';
                toUnitSelect.value = 'ផារ៉ិនហែ';
            } else if (type === 'volume') {
                fromUnitSelect.value = 'លីត្រ';
                toUnitSelect.value = 'ហ្គាឡុង (អាមេរិក)';
            }
        }

        // បំលែងខ្នាត
        function convertUnits() {
            const value = parseFloat(valueInput.value);
            
            if (isNaN(value)) {
                resultDiv.textContent = 'សូមបញ្ចូលតម្លៃដែលត្រឹមត្រូវ';
                return;
            }
            
            const fromUnitName = fromUnitSelect.value;
            const toUnitName = toUnitSelect.value;
            
            const fromUnit = units[currentType].units.find(unit => unit.name === fromUnitName);
            const toUnit = units[currentType].units.find(unit => unit.name === toUnitName);
            
            if (!fromUnit || !toUnit) {
                resultDiv.textContent = 'មានបញ្ហាក្នុងការបំលែង';
                return;
            }
            
            let result;
            
            // ករណីពិសេសសម្រាប់សីតុណ្ហភាព
            if (currentType === 'temperature') {
                if (fromUnitName === 'សេលស្យឺស' && toUnitName === 'ផារ៉ិនហែ') {
                    result = (value * 9/5) + 32;
                } else if (fromUnitName === 'សេលស្យឺស' && toUnitName === 'ខេវីន') {
                    result = value + 273.15;
                } else if (fromUnitName === 'ផារ៉ិនហែ' && toUnitName === 'សេលស្យឺស') {
                    result = (value - 32) * 5/9;
                } else if (fromUnitName === 'ផារ៉ិនហែ' && toUnitName === 'ខេវីន') {
                    result = (value - 32) * 5/9 + 273.15;
                } else if (fromUnitName === 'ខេវីន' && toUnitName === 'សេលស្យឺស') {
                    result = value - 273.15;
                } else if (fromUnitName === 'ខេវីន' && toUnitName === 'ផារ៉ិនហែ') {
                    result = (value - 273.15) * 9/5 + 32;
                } else {
                    result = value;
                }
            } else {
                // បំលែងខ្នាតធម្មតា
                const valueInBase = value * fromUnit.factor;
                result = valueInBase / toUnit.factor;
            }
            
            resultDiv.textContent = `${value} ${fromUnitName} = ${result.toFixed(6)} ${toUnitName}`;
        }

        // ប្ដូរខ្នាតដើម និងខ្នាតគោលដៅ
        function swapUnits() {
            const temp = fromUnitSelect.value;
            fromUnitSelect.value = toUnitSelect.value;
            toUnitSelect.value = temp;
            
            // បំលែងភ្លាមៗប្រសិនបើមានតម្លៃ
            if (valueInput.value) {
                convertUnits();
            }
        }

        // ការកំណត់ព្រឹត្តិការណ៍
        converterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                converterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentType = btn.dataset.type;
                populateUnitOptions(currentType);
                
                // កំណត់តម្លៃទទេ និងលទ្ធផល
                valueInput.value = '';
                resultDiv.textContent = 'លទ្ធផលនឹងបង្ហាញនៅទីនេះ';
            });
        });

        convertBtn.addEventListener('click', convertUnits);
        swapBtn.addEventListener('click', swapUnits);

        // បំលែងភ្លាមៗនៅពេលបញ្ចូលតម្លៃ
        valueInput.addEventListener('input', convertUnits);
        
        // ចាប់ផ្ដើម
        populateUnitOptions(currentType);
