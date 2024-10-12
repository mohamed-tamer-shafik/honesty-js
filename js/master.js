'use strict';
//user's data
const account1 = {
  userName: 'mt2000',
  pin: '1111',
  owner: { en: 'mohamed tamer', ar: 'محمد تامر' },
  transfers: [500, -300, 1500, 600, -250, -100, 2000, -1250],
  inst: [],
  depoistInfo: {
    code: 'D12',
    date: '15/10/2018',
    time: '18:5',
    type: { en: 'deposit', ar: 'ايداع' },
  },
  withdrawInfo: {
    code: 'W12',
    date: '16/9/2018',
    time: '18:5',
    type: { en: 'withdraw', ar: 'سحب' },
  },
};
const account2 = {
  userName: 'ms2004',
  pin: '2222',
  owner: { en: 'mostafa tamer', ar: 'مصطفي تامر' },
  transfers: [300, -600, 125, -60, 200, 2000, -575, -1000],
  inst: [],
  depoistInfo: {
    code: 'D1',
    date: '15/10/2019',
    time: '15:15',
    type: { en: 'deposit', ar: 'ايداع' },
  },
  withdrawInfo: {
    code: 'W1',
    date: '16/9/2019',
    time: '15:15',
    type: { en: 'withdraw', ar: 'سحب' },
  },
};
const account3 = {
  userName: 'ma2001',
  pin: '3333',
  owner: { en: 'mohamed afendy', ar: 'محمد افندي' },
  transfers: [-1000, -650, 1500, 250, 475, -100, 500, -750],
  inst: [],
  depoistInfo: {
    code: 'D8',
    date: '15/10/2019',
    time: '18:5',
    type: { en: 'deposit', ar: 'ايداع' },
  },
  withdrawInfo: {
    code: 'W8',
    date: '16/9/2019',
    time: '18:5',
    type: { en: 'withdraw', ar: 'سحب' },
  },
};
const account4 = {
  userName: 'am2005',
  pin: '4444',
  owner: { en: 'amr mohamed', ar: 'عمرو محمد' },
  transfers: [1500, 1250, -600, -450, -100, 200, 950, 1000],
  inst: [],
  depoistInfo: {
    code: 'D12',
    date: '12/6/2023',
    time: '12:00',
    type: { en: 'deposit', ar: 'ايداع' },
  },
  withdrawInfo: {
    code: 'W12',
    date: '12/13/2023',
    time: '12:00',
    type: { en: 'withdraw', ar: 'سحب' },
  },
};

//selected elements
//general selections
const html = document.querySelector('html');
const body = document.querySelector('body');
const earthIcon = document.querySelector('.languages i');
const langList = document.querySelector('.language-selector');
const langOptions = document.querySelectorAll('.languages a');
const navbarOptions = document.querySelectorAll('.nav-bar a');
//login page selections
const loginBtn = document.querySelector('.login-btn');
const loginArrow = document.querySelector('.login-arrow');
const lgnUserField = document.querySelector('.user-name');
const lgnPinField = document.querySelector('.user-pin');
const userErrMsg = document.querySelector('.name-msg');
const passErrMsg = document.querySelector('.pin-msg');
//transger page selections
const infoOverlay = document.querySelector('.overlay');
const infoPopUp = document.querySelector('.info-msg');
const infoCardCode = document.querySelector('.code');
const infoCardAmount = document.querySelector('.amount');
const infoCardDate = document.querySelector('.date');
const infoCardTime = document.querySelector('.time');
const infoCardType = document.querySelector('.op-type');
const welcomeMsg = document.querySelector('.entry-msg');
const closeBtn = document.querySelector('.info-msg i');
const movsContainer = document.querySelector('.movs');
const balance = document.querySelector('.balance');
const income = document.querySelector('.in');
const outcome = document.querySelector('.out');
const installsInfoBox = document.querySelector('.inst');
const transTo = document.querySelector('.trans-to');
const transAmount = document.querySelector('.trans-amount');
const transBtn = document.querySelector('.trans-btn');
const tranToLable = document.querySelector('.trans-to-label');
const tranAmountLable = document.querySelector('.trans-amount-label');
const closeAccUser = document.querySelector('.close-user');
const closeAccPin = document.querySelector('.close-pin');
const closeAccBtn = document.querySelector('.delete-btn');
const closeUserMsg = document.querySelector('.close-user-msg');
const closePinMsg = document.querySelector('.close-pin-msg');
const logoutBtn = document.querySelector('.logout-btn');
const loanField = document.querySelector('.loan-amount');
const loanLable = document.querySelector('.loan-lable');
const loanBtn = document.querySelector('.loan-btn');
const sortBtn = document.querySelector('.sort-btn');
//installments page
const filterIcon = document.querySelector('.filter-btn i');
const categList = document.querySelector('.catergories-list');
const productsContainer = document.querySelector('.products-displayer');
const searchBtn = document.querySelector('.search-btn');
const searchBar = document.querySelector('.search-bar');
const filterApplyBtn = document.querySelector('.filter-apply');
const filterCancelBtn = document.querySelector('.filter-cancel');
const categBoxes = document.querySelectorAll('.cat input');
const applyPopUp = document.querySelector('.apply-pop-up');
const applyOverlay = document.querySelector('.overlay');
const productName = document.querySelector('.apply-pop-up .name');
const mainImg = document.querySelector('.main-img img');
const miniImgs = document.querySelectorAll('.mini-imgs img');
const popInfoContainer = document.querySelector('.product-info');
const popBtnContainer = document.querySelector('.apply-pop-up .btn-container');
const miniImgsContainers = document.querySelectorAll('.mini-imgs div');
const popCancelBtn = document.querySelector('.pop-up-cancel');
const popApplyBtn = document.querySelector('.pop-up-apply');
const installPaymentPop = document.querySelector('.payment-pop-up');
const paymentMessage = document.querySelector('.payment-msg');
const paymentYesBtn = document.querySelector('.yes-btn');
const paymentNoBtn = document.querySelector('.no-btn');

//global variables
const pageLang = html.lang;
const isEng = pageLang === 'en';
const user = JSON.parse(sessionStorage.getItem('user'));
//array of user's accounts
const accounts = [account1, account2, account3, account4];

//general functions
// a method to re add transfer that doesn't exist in the accounts to the user movements array after reload
const checkExtraTrans = function (additionalMovs, { userName, transfers }) {
  if (additionalMovs)
    additionalMovs.forEach(function (mov) {
      const { src, distAcc, amount } = mov;
      src === userName
        ? transfers.push(-Number(amount))
        : distAcc === userName
        ? transfers.push(Number(amount))
        : '';
    });
};
if (localStorage.getItem('additionalMovs'))
  checkExtraTrans(JSON.parse(localStorage.getItem('additionalMovs')), user);
//function to display error messages at any validation
const displayError = function (errMsg, msgField, field) {
  field.classList.add(`lgn-err`);
  msgField.textContent = errMsg;
  msgField.style.color = 'red';
};

// function convert from english numbers to arabic
String.prototype.intoAr = function () {
  return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};

//function for checking fields existance

const handleEmptyFields = function (...fields) {
  fields.forEach(function ({ field, msgField, errMsg }) {
    if (!field.value) displayError(errMsg[pageLang], msgField, field);
  });
};
//function to handle common validations
const commonValidation = function (fields, acc, e) {
  const { field1, field2, msgField1, msgField2, errMsg } = fields;
  const userName = field1.value;
  const pin = field2.value;
  if (!userName || !pin)
    handleEmptyFields(
      {
        field: field1,
        msgField: msgField1,
        errMsg: {
          en: ' please enter user name',
          ar: 'من فضلك ادخل اسم المستخدم ',
        },
      },
      {
        field: field2,
        msgField: msgField2,
        errMsg: { en: 'please enter pin', ar: 'من فضلك ادخل الرمز السري' },
      }
    );
  else {
    if (!acc) displayError(errMsg[pageLang], msgField1, field1);
    else {
      if (acc.pin === pin) {
        if (e) {
          if (e.currentTarget.href) location.href = e.currentTarget.href;
          else location.href = loginArrow.href;
          sessionStorage.setItem('user', JSON.stringify(acc));
        } else {
          const accIndex = accounts.findIndex(
            account => account.userName === acc.userName
          );
          if (localStorage.getItem('deletedAccs'))
            localStorage.setItem(
              JSON.stringify([
                ...JSON.parse(localStorage.getItem('deletedAccs')),
                accIndex,
              ])
            );
          else localStorage.setItem('deletedAccs', JSON.stringify([accIndex]));
          location.href = logoutBtn.href;
        }
      } else
        displayError(
          isEng ? 'wrong pin' : 'خطا في الرقم السري',
          msgField2,
          field2
        );
    }
  }
};
//handle remove errors effect in input
const removeError = function (...fields) {
  fields.forEach(function ({ field }) {
    field.addEventListener('input', function () {
      if (field.classList.contains('lgn-err'))
        fields.forEach(function ({ field, msgField, defaultContent }) {
          field.classList.remove('lgn-err');
          msgField.textContent = defaultContent
            ? defaultContent[pageLang]
            : defaultContent;
          if (defaultContent) msgField.style.color = 'black';
        });
    });
  });
};

//a function to hide a droplist
const hideElement = list => list.classList.add('hidden');
//handle pop-up removal
const removePopUp = function (overlay, popUp) {
  hideElement(overlay);
  hideElement(popUp);
};
//handle pop-up displaying
const displayPopUp = function (overlay, popUp) {
  overlay.classList.remove('hidden');
  popUp.classList.remove('hidden');
};
//function to return user balance
const getBalance = movements => movements.reduce((acc, move) => acc + move, 0);
//function to handle adding additional transfers or loans to local storage (i.e movements that not exist in user transfers array)
const hadnleAdditionalMovs = function (move) {
  if (localStorage.getItem('additionalMovs')) {
    const additionalMovs = JSON.parse(localStorage.getItem('additionalMovs'));
    additionalMovs.push(move);
    localStorage.setItem('additionalMovs', JSON.stringify(additionalMovs));
  } else localStorage.setItem('additionalMovs', JSON.stringify([move]));
};
//handeling language droplist
//toggle the list when click on earth icon
earthIcon.addEventListener('click', () => langList.classList.toggle('hidden'));
//close the list when click on any element in the body except the earth icon
body.addEventListener('click', e =>
  e.target === earthIcon ? '' : hideElement(langList)
);

if (loginBtn) {
  //handelig login functionality
  const handleLogin = function (e) {
    if (e.currentTarget.href || e.key === 'Enter') {
      e.preventDefault();
      if (localStorage.getItem('deletedAccs'))
        JSON.parse(localStorage.getItem('deletedAccs')).forEach(index =>
          accounts.splice(index, 1)
        );
      const user = accounts.find(
        account => account.userName === lgnUserField.value
      );
      commonValidation(
        {
          field1: lgnUserField,
          field2: lgnPinField,
          msgField1: userErrMsg,
          msgField2: passErrMsg,
          errMsg: { en: `account doesn't exist`, ar: 'الحساب غير موجود' },
        },
        user,
        e
      );
    }
  };
  loginBtn.addEventListener('click', handleLogin);
  loginArrow.addEventListener('click', handleLogin);
  body.addEventListener('keydown', handleLogin);

  //handeling removing error at change
  removeError(
    { field: lgnUserField, msgField: userErrMsg, defaultContent: '' },
    { field: lgnPinField, msgField: passErrMsg, defaultContent: '' }
  );
}
if (welcomeMsg) {
  //function for clearing fields
  const clearFields = (...fields) =>
    fields.forEach(field => (field.value = ''));
  /*function to update installment array everytime we enter the wallet pageto most recent 
  installments subscribtion*/
  const updateInstallments = function (installments, { userName, inst }) {
    if (installments)
      installments.forEach(installment =>
        installment.userName === userName ? inst.push(installment.amount) : ''
      );
    const totalInstalls =
      inst.length > 0 ? inst.reduce((acc, install) => acc + install, 0) : 0;
    installsInfoBox.textContent = isEng
      ? `${totalInstalls} EGP`
      : `${totalInstalls} ج.م`.intoAr();
  };
  updateInstallments(JSON.parse(localStorage.getItem('installments')), user);

  //  a function to inject movements and add icons functionalities at the same time
  const handleMovsAndIcons = function (user) {
    injectionMovements(user);
    const infoIcons = document.querySelectorAll('.mov i');
    handleInfoMsg(infoIcons, user);
  };
  //welcome message injection
  const injectWeclomeMsg = function (name) {
    const firstName = name[pageLang].split(' ')[0];
    welcomeMsg.textContent = isEng
      ? `welcome, ${firstName}!`
      : `مرحبا,  ${firstName} `;
  };
  injectWeclomeMsg(user.owner);
  //balance injection

  const displayBalance = function (movements) {
    const userBalance = getBalance(movements);
    balance.textContent = isEng
      ? `${userBalance} EGP`
      : `${userBalance} ج.م`.intoAr();
  };
  //movements injection
  const injectionMovements = function ({
    transfers,
    depoistInfo: depInfo,
    withdrawInfo: witInfo,
  }) {
    //to clear movements container before each new inject
    movsContainer.innerHTML = '';
    transfers.forEach(function (mov, i) {
      const isDeposit = mov > 0;
      const movAbsValue = Math.abs(mov);
      const date = isDeposit ? depInfo.date : witInfo.date;
      const movHtml = `
      <div class="mov">
      <div>
                  <i class="fa-solid fa-info" data-index=${i}></i>
                  <span class="type ${isDeposit ? 'dep-op' : 'with-op'}">${
        isEng ? i + 1 : String(i + 1).intoAr()
      } ${isDeposit ? depInfo.type[pageLang] : witInfo.type[pageLang]}</span>
                  <span class="date">${isEng ? date : date.intoAr()}</span>
                  </div>
                  <span class="mov-cost">${
                    isEng ? `${movAbsValue} EGP` : `${movAbsValue} ج.م`.intoAr()
                  }</span>
                  </div>
                  `;
      movsContainer.insertAdjacentHTML('afterbegin', movHtml);
    });
  };
  //handeling info icon display and remove
  const handleInfoMsg = function (
    infoIcons,
    { transfers, withdrawInfo, depoistInfo }
  ) {
    //handle display
    infoIcons.forEach(function (icon) {
      icon.addEventListener('click', function (e) {
        const amount = transfers[Number(e.target.dataset.index)];
        const absAmount = Math.abs(amount);
        const { code, date, time, type } =
          amount > 0 ? depoistInfo : withdrawInfo;
        infoCardCode.textContent = code;
        infoCardAmount.textContent = isEng
          ? absAmount
          : String(absAmount).intoAr();
        infoCardDate.textContent = isEng ? date : date.intoAr();
        infoCardTime.textContent = isEng ? time : time.intoAr();
        infoCardType.textContent = type[pageLang];
        displayPopUp(infoOverlay, infoPopUp);
      });
    });
  };
  infoOverlay.addEventListener('click', () =>
    removePopUp(infoOverlay, infoPopUp)
  );
  closeBtn.addEventListener('click', () => removePopUp(infoOverlay, infoPopUp));
  //income , outcome ,installments injection
  const displayInfoRow = function (movements, installs) {
    const totalIncome = movements
      .filter(move => move > 0)
      .reduce((acc, move) => acc + move, 0);
    const totalOutcome = Math.abs(
      movements.filter(move => move < 0).reduce((acc, move) => acc + move)
    );

    income.textContent = isEng
      ? `${totalIncome} EGP`
      : `${totalIncome} ج.م`.intoAr();
    outcome.textContent = isEng
      ? `${totalOutcome} EGP`
      : `${totalOutcome} ج.م`.intoAr();
  };
  //display ui depend on movements
  const displayMoneyUi = function (user) {
    displayBalance(user.transfers);
    handleMovsAndIcons(user);
    displayInfoRow(user.transfers, user.inst);
  };
  displayMoneyUi(user);
  //Implementing transfer system
  transBtn.addEventListener('click', function () {
    const distAcc = transTo.value;
    const amount = transAmount.value;
    const reciver = accounts.find(acc => acc.userName === distAcc);
    if (!distAcc || !amount)
      handleEmptyFields(
        {
          field: transTo,
          msgField: tranToLable,
          errMsg: { en: ' please enter reciver', ar: 'من فضلك ادخل المستلم ' },
        },
        {
          field: transAmount,
          msgField: tranAmountLable,
          errMsg: { en: ' please enter amount', ar: 'من فضلك ادخل الكميه ' },
        }
      );
    else if (!reciver)
      displayError(
        isEng ? `account doesn't exist` : 'الحساب غير موجود',
        tranToLable,
        transTo
      );
    else if (reciver.userName === user.userName)
      displayError(
        isEng
          ? `you can't transfer to your account `
          : 'لا يمكن التحويل لحسابك',
        tranToLable,
        transTo
      );
    else if (Number(amount) <= 0)
      displayError(
        isEng ? `invalid ammount ` : 'خطأ في قيمه الكميه',
        tranAmountLable,
        transAmount
      );
    else if (Number(amount) > getBalance(user.transfers))
      displayError(
        isEng ? `balance not enough` : 'الميزانيه لا تكفي',
        tranAmountLable,
        transAmount
      );
    else {
      hadnleAdditionalMovs({
        src: user.userName,
        distAcc,
        amount,
      });
      user.transfers.push(-Number(amount));
      displayMoneyUi(user);
      clearFields(transTo, transAmount);
    }
  });
  removeError(
    {
      field: transTo,
      msgField: tranToLable,
      defaultContent: { en: 'Transfer to', ar: 'الي' },
    },
    {
      field: transAmount,
      msgField: tranAmountLable,
      defaultContent: { en: 'Amount', ar: 'الكميه' },
    }
  );

  //handeling deleting account
  closeAccBtn.addEventListener('click', () =>
    commonValidation(
      {
        field1: closeAccUser,
        field2: closeAccPin,
        msgField1: closeUserMsg,
        msgField2: closePinMsg,
        errMsg: { en: `invalid account`, ar: 'الحساب غير صحيح ' },
      },
      closeAccUser.value === user.userName ? user : undefined
    )
  );
  //handeling delete account error removal
  removeError(
    {
      field: closeAccUser,
      msgField: closeUserMsg,
      defaultContent: { en: 'Confirm user', ar: 'تأكيد اسم المستخدم' },
    },
    {
      field: closeAccPin,
      msgField: closePinMsg,
      defaultContent: { en: 'Confirm pin', ar: 'تأكيد كلمه المرور' },
    }
  );
  //loan functionality
  loanBtn.addEventListener('click', function () {
    const amount = loanField.value;
    /*this variable check wether the loan is valid or not , it is valid if the user has at least one deposit qeual to 10% of 
    the loan requested */
    const isValid = user.transfers.some(move => move >= 0.1 * Number(amount));
    if (!amount)
      handleEmptyFields({
        field: loanField,
        msgField: loanLable,
        errMsg: { en: ' please enter amount', ar: 'من فضلك ادخل الكميه ' },
      });
    else if (Number(amount) <= 0)
      displayError(
        isEng ? 'invalid amount' : 'خطأ في الكميه ',
        loanLable,
        loanField
      );
    else if (!isValid)
      displayError(
        isEng ? 'invalid loan conditions' : 'خطأ في شروط القرض ',
        loanLable,
        loanField
      );
    else {
      hadnleAdditionalMovs({
        src: '',
        distAcc: user.userName,
        amount,
      });
      user.transfers.push(Number(amount));
      displayMoneyUi(user);
      clearFields(loanField);
    }
  });
  removeError({
    field: loanField,
    msgField: loanLable,
    defaultContent: { en: 'Amount', ar: 'الكميه' },
  });
  //movement's sotring functionlaity
  let isSorted = false;
  sortBtn.addEventListener('click', function () {
    //a deep clone of original object
    const userDeepClone = JSON.parse(JSON.stringify(user));
    isSorted ? '' : userDeepClone.transfers.sort((a, b) => a - b);
    isSorted = !isSorted;
    handleMovsAndIcons(userDeepClone);
  });
}
//installments page starts
if (filterIcon) {
  //function to convert english arabic number to english
  const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

  //handling filter droplist
  //toggeling the categories list when click on filter icon
  filterIcon.addEventListener('click', function () {
    categList.classList.toggle('hidden');
    if (!categList.classList.contains('hidden'))
      categBoxes.forEach(box => (box.checked = false));
  });
  /*function to close the filter list when clicking on any element in the body except 
  the filter icon and the list itself */
  body.addEventListener('click', function (e) {
    let element = e.target;
    while (element !== document && element !== categList)
      element = element.parentNode;
    if (e.target !== filterIcon && element !== categList) {
      hideElement(categList);
    }
  });

  //function to create products cards and inject them to the dom
  const injectProducts = function (products) {
    productsContainer.innerHTML = '';
    products.forEach(function (prod, i) {
      //using keys and values array as each product have different properties (not identical objects)
      const keys = Object.keys(prod);
      const values = Object.values(prod);
      const productBox = `  <div class="product">
      <div class="img-container">
      <img src="${prod.images[0]}"   alt="product's image" />
            </div>
            <p class="name">${prod.name}</p>
          <div class="product-desc">
            <div class="desc">
              <span>${keys[2]}</span>
              <span>${values[2]}</span>
            </div>
            <div class="desc">
              <span>${keys[3]}</span>
              <span>${values[3]}</span>
            </div>
            <div class="desc">
              <span>${keys[4]}</span>
              <span>${values[4]}</span>
            </div>
            <div class="desc">
              <span>${keys[5]}</span>
              <span>${values[5]}</span>
            </div>
            </div>
            <button class="card-apply-btn green-border" data-index="${i}">${
        isEng ? 'apply' : 'تقسيط'
      }</button>
        </div>`;
      productsContainer.insertAdjacentHTML('afterbegin', productBox);
    });
    handleProductApply(document.querySelectorAll('.card-apply-btn'), products);
  };
  //variable to store the products after being fetched first time do avoid redundant fetching
  let products;
  //function to fetch products data and display them
  const displayProducts = async function () {
    try {
      const response = await fetch(
        isEng ? '/js/data-en.json' : '/js/data-ar.json'
      );
      if (!response.ok) throw new Error('failed to connect to json file');
      const prod = await response.json();
      products = prod;
      injectProducts(prod);
    } catch (error) {
      console.log(error);
    }
  };
  displayProducts();
  //handle search functionality
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const searchText = searchBar.value.toLowerCase();
    const filtredProducts = products.filter(prod =>
      prod.name.toLowerCase().includes(searchText)
    );
    injectProducts(filtredProducts);
  });
  //handle filter products functionality
  filterApplyBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const checkedBoxes = [],
      totalFiltredProduct = [];
    categBoxes.forEach(box => (box.checked ? checkedBoxes.push(box) : ''));
    if (checkedBoxes.length > 0) {
      checkedBoxes.forEach(function (box) {
        const filtredProducts = products.filter(
          prod => prod.category === box.value
        );
        totalFiltredProduct.push(...filtredProducts);
      });
      injectProducts(totalFiltredProduct);
    } else injectProducts(products);
    hideElement(categList);
    searchBar.value = '';
  });

  //closing category list using cancel button
  filterCancelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    hideElement(categList);
  });
  //handeling the functionality of apply button inside the products
  const handleProductApply = (applyBtns, products) =>
    applyBtns.forEach(btn =>
      btn.addEventListener('click', function (e) {
        const product = products.find(
          (_, i) => i === Number(e.target.dataset.index)
        );
        //handeling adding the info element in the pop-up
        const oldProdutInfo = document.querySelector(
          '.apply-pop-up .product-desc'
        );
        if (oldProdutInfo) oldProdutInfo.remove();
        const productInfo = e.target.previousElementSibling.cloneNode(true);
        popInfoContainer.insertBefore(productInfo, popBtnContainer);
        //adding the name and the images of the products in the pop-up
        productName.textContent = product.name;
        for (let i = 0; i < product.images.length; i++)
          miniImgs[i].src = product.images[i];
        mainImg.src = product.images[0];
        /*adding the installment per month price as a data attribute in the applly button in the pop up
      to be used when clicking apply*/
        popApplyBtn.dataset.cost = parseInt(
          isEng ? product['Install. Per Month'] : a2e(product['القسط الشهري'])
        );
        displayPopUp(applyOverlay, applyPopUp);
        //resitting the selec-img class to the first image container (selected border)
        miniImgsContainers.forEach(container =>
          container.classList.remove('selec-img')
        );
        miniImgsContainers[0].classList.add('selec-img');
      })
    );
  //function to handle mini-images switching functionality
  const handleImagesSwitching = imgs =>
    imgs.forEach(img =>
      img.addEventListener('click', function (e) {
        miniImgsContainers.forEach(container =>
          container.classList.remove('selec-img')
        );
        mainImg.src = e.target.src;
        e.target.parentNode.classList.add('selec-img');
      })
    );
  handleImagesSwitching(miniImgs);
  // handle closing installments apply pop-up
  applyOverlay.addEventListener('click', () =>
    removePopUp(applyOverlay, applyPopUp)
  );
  popCancelBtn.addEventListener('click', () =>
    removePopUp(applyOverlay, applyPopUp)
  );
  //handle apply pop-up apply button to install the products
  popApplyBtn.addEventListener('click', function (e) {
    applyPopUp.classList.add('hidden');
    installPaymentPop.classList.remove('hidden');
    const installCost = Number(e.target.dataset.cost);
    const userBalance = getBalance(user.transfers);
    let message;
    if (userBalance >= installCost)
      message = isEng
        ? `are you sure to pay ${installCost}EGP as first install`
        : `هل انت متأكد من دفع ${installCost}ج.م كأول قيمه قسط`.intoAr();
    else {
      const remainingMoney = installCost - userBalance;
      message = isEng
        ? `balance is not enough, we can loan you ${remainingMoney}EGP and then add it on next installments`
        : `ميزانيتك غير كافيه ,من الممكن ان نقرضك ${remainingMoney}ج.م من ثم اضافته علي باقي الاقساط`.intoAr();
    }
    paymentMessage.textContent = message;
  });
  //handle yes button in the installment payment pop-up
  paymentYesBtn.addEventListener('click', function () {
    const userBalance = getBalance(user.transfers);
    const installCost = Number(popApplyBtn.dataset.cost);
    /*handeling updating balance (transfers array) and saving movements in additional movs array
(to save the movements done even after refresh) */
    if (userBalance >= installCost) {
      hadnleAdditionalMovs({
        src: user.userName,
        distAcc: '',
        amount: installCost,
      });
      user.transfers.push(-installCost);
    } else {
      hadnleAdditionalMovs({
        src: '',
        distAcc: user.userName,
        amount: installCost - userBalance,
      });
      hadnleAdditionalMovs({
        src: user.userName,
        distAcc: '',
        amount: installCost,
      });
      /*in this case i replaced transfer with array of zero because as i reached this case 
      the transfer sum will be always zero so no need to add each transfer in deatil as always
      the summation will always boil down to zero  */
      user.transfers = [0];
    }
    //adding the installment in the installment array to use it then in wallet page
    if (localStorage.getItem('installments')) {
      const installments = JSON.parse(localStorage.getItem('installments'));
      installments.push({
        userName: user.userName,
        amount: installCost,
      });
      localStorage.setItem('installments', JSON.stringify(installments));
    } else {
      localStorage.setItem(
        'installments',
        JSON.stringify([
          {
            userName: user.userName,
            amount: installCost,
          },
        ])
      );
    }
    removePopUp(applyOverlay, installPaymentPop);
  });
  //handle no button in the installment payment pop-up
  paymentNoBtn.addEventListener('click', function () {
    applyPopUp.classList.remove('hidden');
    installPaymentPop.classList.add('hidden');
  });
}
/*installments page ends 
there is still to features using timers and date add it leter*/
