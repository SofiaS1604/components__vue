<template>
    <div class="number">
        <div class="input__container">
            <input class="input__number"
                   type="text"
                   :id="id"
                   :name="name"
                   :placeholder="placeholder"
                   :readonly="readonly"
                   :disabled="disabled"
                   :value="currentValue"
                   @keydown.delete="deleteValue"
                   @keydown.up="stepChange(stepAmount)"
                   @keydown.down="stepChange(-stepAmount)"
                   @input="handleKeyPress"
                   @select="selectValue"
            />

            <div class="input__arrows">
                <div class="input__arrow input__arrow--up" @click="stepChange(stepAmount)">
                    <img src="https://img.icons8.com/plasticine/50/000000/collapse-arrow.png"/>
                </div>
                <div class="input__arrow input__arrow--down" @click="stepChange(-stepAmount)"
                     style="transform: rotate(180deg)">
                    <img src="https://img.icons8.com/plasticine/50/000000/collapse-arrow.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputNumber',
        props: [
            'id',
            'name',
            'type',
            'placeholder',
            'step',
            'min',
            'max',
            'readonly',
            'disabled',
            'value'
        ],
        data() {
            return {
                maxAmount: this.max ? parseInt(this.max) : 100,
                stepAmount: this.step ? parseInt(this.step) : 1,
                minAmount: this.min ? parseInt(this.min) : 0,
                stepMin: !!(this.min && this.step),
                val: this.value ? this.value : '0',
                currentValue: this.value,
                selectStart: 0,
                selectLength: -1
            };
        },
        watch: {
            val(val) {
                this.valueInput(val)
            }
        },
        methods: {
            handleKeyPress(e) {
                const allowedChars = new RegExp('^[a-z0-9]+$');
                const match = allowedChars.test(e.data);

                this.val = !!match ? this.currentValue + e.data : this.currentValue + '';
            },

            selectValue(e) {
                this.selectStart = e.srcElement.selectionStart;
                this.selectLength = e.srcElement.selectionEnd - e.srcElement.selectionStart;
            },

            stepChange(diff) {
                this.val = parseInt(this.val);
                if (this.val <= this.maxAmount && this.val >= this.minAmount)
                    this.val += this.stepMin ? diff - this.val % this.minAmount % diff : diff;

                this.stepMin = this.stepMin ? !this.stepMin : this.stepMin;

                if (this.val > this.maxAmount) {
                    this.val = this.maxAmount;
                } else if (this.val < this.minAmount) {
                    this.val = this.minAmount;
                }

                this.$forceUpdate();
            },

            valueInput(val) {
                val += '';
                let reg = new RegExp('^[a-z]+$');
                if (!!reg.test(val[val.length - 1]))
                    val = val.slice(0, -1);

                this.currentValue = val;
                this.val = this.currentValue;
                this.$forceUpdate()
            },

            deleteValue() {
                if (this.selectLength === -1)
                    this.currentValue = this.currentValue.slice(0, -1);
                else {
                    this.currentValue = this.currentValue.substr(0, this.selectStart) +
                        this.currentValue.substring(this.selectStart + this.selectLength)
                }

                this.selectStart = 0;
                this.selectLength = -1;
            }
        },
    };
</script>
