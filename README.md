# Product-API-Search
✅ useState ✅ useEffect ✅ API integration ✅ async/await ✅ try/catch/finally ✅ Loading state ✅ Error handling (state) ✅ Controlled (search input) components ✅ Search filtering ✅ filter() ✅ map() ✅ Props ✅ Component composition ✅ Stable (React)keys ✅ Derived state

1️⃣ App.jsx
2️⃣ SearchBar.jsx
This component handles the controlled search input.
3️⃣ ProductList.jsx
4️⃣ ProductCard.jsx

🔄 Complete Data Flow
Component Mounts
       ↓
useEffect Runs
       ↓
Fetch Product API
       ↓
Loading = true
       ↓
 ┌───────────────┐
 │               │
Success        Error
 │               │
 ↓               ↓
setProducts    setError
 │               │
 └───────┬───────┘
         ↓
   Loading = false
         ↓
      Render UI
         ↓
User types search
         ↓
setSearch()
         ↓
Component Re-renders
         ↓
filter()
         ↓
Display matching products

## 🧑‍💻 Built-in Method Used: filter()
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);

### What happens?

#### Suppose:
search = "phone";

#### Products:
Laptop
Phone
Headphones

#### Result:
Phone
Headphones

Because "headphones" also contains "phone".

## 🔧 Without filter() — Using a Loop

##### If an interviewer asks:
##### "Can you solve the search without using filter()?"

You can write:

const filteredProducts = [];

for (let i = 0; i < products.length; i++) {
  const productTitle = products[i].title.toLowerCase();
  const searchText = search.toLowerCase();

  if (productTitle.includes(searchText)) {
    filteredProducts.push(products[i]);
  }
}

This gives the same result.

## Without filter() AND Without includes()
For deeper JavaScript practice:
const filteredProducts = [];

const searchText = search.toLowerCase();

for (let i = 0; i < products.length; i++) {
  const productTitle = products[i].title.toLowerCase();

  let found = false;

  for (let j = 0; j <= productTitle.length - searchText.length; j++) {
    let match = true;

    for (let k = 0; k < searchText.length; k++) {
      if (productTitle[j + k] !== searchText[k]) {
        match = false;
        break;
      }
    }

    if (match) {
      found = true;
      break;
    }
  }

  if (found) {
    filteredProducts.push(products[i]);
  }
}

⚠️ For real production code, prefer filter() and includes() because they are more readable.

.

## 🧑‍💻 Built-in Rendering: .map()
{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}

## ❓ Can We Render a React List Without .map()?

Yes, but for a dynamic React list, map() is the standard and recommended approach.

For a small fixed list:
<>
  <ProductCard product={products[0]} />
  <ProductCard product={products[1]} />
  <ProductCard product={products[2]} />
</>

But this is not scalable.

## Strong interview answer:
"Although JavaScript loops can process the data, in React map() is the standard declarative approach for transforming an array into JSX elements. For dynamic UI lists, I prefer map() with a stable key such as the database or API ID."

### 🔑 Why key={product.id}?

React uses keys to identify items between renders.

<ProductCard
  key={product.id}
  product={product}
/>
### Why not index?
key={index} // ❌ Avoid for changing lists

If products are:
Added
Deleted
Reordered
Filtered

the index can refer to a different item and cause incorrect component identity/state.

## Interview Answer
"I use product.id as a stable key because React uses keys to identify list items across renders. I avoid array indexes when the list can change order, be filtered, or have items added or removed."

## 🎤 Full Interview Explanation
"I keep the API response in state because it changes after the asynchronous request. I use useEffect to fetch the products when the component mounts and maintain separate loading and error states so the UI can represent each request state. The search input is controlled using state, and I derive filtered products from the original product array instead of storing duplicate filtered data in state. Finally, I render the results using map() and use the product ID as a stable key."

## 🔥 Follow-up Questions
### 1. Why don't you store filteredProducts in state?
Answer:
"Because filtered products can be derived from products and search. Storing derived data separately can create synchronization problems and unnecessary state."

Excellent interview answer ⭐

### 2. What causes the component to re-render?
setProducts()
setLoading()
setError()
setSearch()

Any relevant state update schedules a re-render.

### 3. Why use useEffect for the API call?

"Because API calls are side effects. useEffect lets us perform the request outside the normal rendering process."

### 4. Can this API call cause an infinite loop?

With this:
useEffect(() => {
  fetchProducts();
}, []);

No dependency is changing to repeatedly trigger the effect.

But this can be problematic:

useEffect(() => {
  fetchProducts();
  setProducts(data);
}, [products]);

Because updating products can trigger the effect again.

## ⚡ Production-Level Improvement

For a user who quickly changes pages or unmounts the component during a request, you can cancel the request with AbortController.

useEffect(() => {
  const controller = new AbortController();

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://dummyjson.com/products",
        {
          signal: controller.signal
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data.products);

    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    }
  }

  fetchProducts();

  return () => {
    controller.abort();
  };
}, []);


## Interview Answer
"For production API requests, I may use AbortController to cancel an in-flight fetch during cleanup, especially when the component unmounts or a newer request replaces an older one."


