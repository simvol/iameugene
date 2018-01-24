// Compare two arrays and add status 'Added', 'Unchanged, 'Deleted' to all items
export function getWithStatuses(newArray, originalCopy, key) {
  let arrayWithStatuses = [];
  if (newArray && newArray.length > 0 ) {
    newArray.forEach(function (newItem) {

      var originalItem = originalCopy.find(item => item[key] === newItem[key])

      if (originalItem === undefined) {
        newItem.state = "Added";
      } else {

        if (originalItem.userApplicationIsActive === newItem.userApplicationIsActive) {
            newItem.state = "Unchanged";
        } else {
            newItem.state = "Changed";
        }
      }
      arrayWithStatuses.push(newItem);
    });
  }

  if (originalCopy && originalCopy.length > 0) {
      originalCopy.forEach(function (originalItem) {

        var newItem = arrayWithStatuses.find(item => item[key] === originalItem[key])
        
        if (newItem === undefined) {
          if (originalItem.state === "Deleted") {
            originalItem.state = "Unchanged";
          } else {
            originalItem.userApplicationIsActive = false;
            originalItem.state = "Deleted";
          }

          arrayWithStatuses.push(originalItem);
        }
      });
  }

  return arrayWithStatuses;
 }