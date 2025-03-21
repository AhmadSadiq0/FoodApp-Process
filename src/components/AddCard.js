// import React, { useState } from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// //images
// import { BURGERIMG } from "../res/drawables";
// //colors
// import {
//   THEME_COLOR,
//   THEME_TEXT_COLOR,
//   GRAY_COLOR,
//   BLACK_COLOR,
//   WHITE_COLOR,
// } from "../res/colors";
// import CustomButton from "./CustomButtom";
// import useThemeStore from "../../zustand/ThemeStore";

// const AddCard = (props) => {
//   const { name, description, image, price, buttonText, onAddToCart } = props;

//   const { darkMode } = useThemeStore();

//   const [selectedSize, setSelectedSize] = useState("Small");

//   const handleSizeSelection = (size) => {
//     setSelectedSize(size);
//   };

//   const getAdjustedPrice = () => {
//     switch (selectedSize) {
//       case "Small":
//         return 50;
//       case "Medium":
//         return 100;
//       case "Large":
//         return 150;
       
//       default:
//         return 0;
//     }
//   };

//   return (
//     <View
//       style={{
//         ...styles.card,
//         backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
//       }}
//     >
//       <Text
//         style={{
//           ...styles.name,
//           color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
//         }}
//         numberOfLines={name.length > 16 ? 2 : 1}
//       >
//         {name}
//         {/* {name && name.length > 16 ? name.slice(0, 16) + "..." : name} */}
//       </Text>
//       <Text
//         style={{
//           ...styles.description,
//           color: darkMode ? THEME_COLOR : THEME_COLOR,
//         }}
//       >
//         {/* {description && description.length > 30 ? description.slice(0, 50) + "..." : description} */}
//         {description}
//       </Text>
//       <Image source={image ? { uri: image } : BURGERIMG} style={styles.image} />

//       <View style={styles.sizeContainer}>
//         {["Small", "Medium", "Large", ].map((size) => (
//           <TouchableOpacity
//             key={size}
//             style={{
//               ...styles.sizeButton,
//               backgroundColor:
//                 selectedSize === size ? THEME_COLOR : GRAY_COLOR,
//             }}
//             onPress={() => handleSizeSelection(size)}
//           >
//             <Text
//               style={{
//                 ...styles.sizeButtonText,
//                 color: selectedSize === size ? WHITE_COLOR : BLACK_COLOR,
//               }}
//             >
//               {size}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       {/* Price Display */}
//       <View style={styles.priceContainer}>
//         <Text
//           style={{
//             ...styles.priceLabel,
//             color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
//           }}
//         >
//           Total Price :
//         </Text>
//         <Text
//           style={{
//             ...styles.price,
//             color: darkMode ? THEME_COLOR : THEME_COLOR,
//           }}
//         >
//           {`Rs. ${getAdjustedPrice()}`}
//         </Text>
//       </View>

//       <CustomButton
//         title={buttonText || "Add To Cart"}
//         style={{
//           ...styles.buttonText,
//           color: darkMode ? WHITE_COLOR : BLACK_COLOR,
//         }}
//         // onPress={() => onAddToCart({ ...props, size: selectedSize })}
//         // onPress={() => onAddToCart({ 
//         //   id: Math.random().toString(), 
//         //   name, 
//         //   description, 
//         //   image, 
//         //   price: getAdjustedPrice(), 
//         //   size: selectedSize 
//         // })}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   card: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 12,
//     alignItems: "center",
//     margin: 10,
//   },
//   name: {
//     fontSize: 17,
//     textAlign: "center",
//     marginBottom: 4,
//   },
//   description: {
//     fontSize: 24,
//     textAlign: "center",
//     fontWeight: "700",
//     marginBottom: 10,
//   },
//   image: {
//     width: 148,
//     height: 148,
//     resizeMode: "contain",
//     marginVertical: 8,
//   },
//   sizeContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   sizeButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     margin: 4,
//   },
//   sizeButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   priceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//     marginBottom: 12,
//   },
//   priceLabel: {
//     fontSize: 24,
//     fontWeight: "700",
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: "700",
//   },
//   buttonText: {
//     fontSize: 24,
//     fontWeight: "700",
//     paddingHorizontal: 100,
//     // marginBottom: 40,
//   },
// });
// export default AddCard;

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
//images
import { BURGERIMG } from "../res/drawables";
//colors
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from "../res/colors";
import CustomButton from "./CustomButtom";
import useThemeStore from "../../zustand/ThemeStore";

const AddCard = (props) => {
  
  const {
    name = "",
    description = "",
    image,
    variants = [], 
    buttonText = "Add To Cart",
    onAddToCart,
  } = props;
  console.log("Variants:", variants);

  const { darkMode } = useThemeStore();
  const [selectedSize, setSelectedSize] = useState(variants[0]?.size || "Small");

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const getAdjustedPrice = () => {
    const selectedVariant = variants.find((variant) => variant.name == selectedSize);
    return selectedVariant ? selectedVariant.price : 0;
  };

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
      }}
    >
      <Text
        style={{
          ...styles.name,
          color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
        }}
        numberOfLines={name.length > 16 ? 2 : 1}
      >
        {name}
      </Text>
      <Text
        style={{
          ...styles.description,
          color: darkMode ? THEME_COLOR : THEME_COLOR,
        }}
      >
        {description}
      </Text>
      <Image source={image ? { uri: image } : BURGERIMG} style={styles.image} />

      {/* Render size buttons only if `variants` is an array and has items */}
      {Array.isArray(variants) && variants.length > 0 ? (
        <View style={styles.sizeContainer}>
          {variants.map((variant) => (
            <TouchableOpacity
              key={variant.size}
              style={{
                ...styles.sizeButton,
                backgroundColor:
                  selectedSize === variant.name ? THEME_COLOR : GRAY_COLOR,
              }}
              onPress={() => handleSizeSelection(variant.name)}
            >
              <Text
                style={{
                  ...styles.sizeButtonText,
                  color: selectedSize === variant.name ? WHITE_COLOR : BLACK_COLOR,
                }}
              >
                {variant.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>
          No variants available
        </Text>
      )}

      {/* Price Display */}
      <View style={styles.priceContainer}>
        <Text
          style={{
            ...styles.priceLabel,
            color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
          }}
        >
          Total Price :
        </Text>
        <Text
          style={{
            ...styles.price,
            color: darkMode ? THEME_COLOR : THEME_COLOR,
          }}
        >
          {`Rs. ${getAdjustedPrice()}`}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <CustomButton
        title={buttonText}
        style={{
          ...styles.buttonText,
          color: darkMode ? WHITE_COLOR : BLACK_COLOR,
        }}
        onPress={() =>
          onAddToCart({
            id: Math.random().toString(),
            name,
            description,
            image,
            price: getAdjustedPrice(),
            size: selectedSize,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 24,
    fontWeight: "700",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 100,
  },
});

export default AddCard;