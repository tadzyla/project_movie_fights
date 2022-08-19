const createAutoComplete = ({    //reusable widget
    root, 
    renderOption,
    onOptionSelect, 
    inputValue, 
    fetchData 
    }) => {
    
    root.innerHTML = `                          
    <label><b>Search for the movie</b></label>
    <input class="input" placeholder="e.g. Titanic"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;  //element that the autocomplete should be render into 
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    
    const onInput = async event => {
        const items =  await fetchData(event.target.value);
    
        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }
    
        resultsWrapper.innerHTML = '';                         //clears input for next search
        dropdown.classList.add('is-active')
    
        for(let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
    
            resultsWrapper.appendChild(option);
        }
    };
    
    input.addEventListener('input', debounce(onInput, 500));
    
    document.addEventListener('click', event => {
        if(!root.contains(event.target)) {               //removes drop list if click anywhere on page
            dropdown.classList.remove('is-active');
        }
    });
}