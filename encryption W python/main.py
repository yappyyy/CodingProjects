import random
import string
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Encrypt or decrypt a message using a substitution cipher.")
    parser.add_argument("-e", "--encrypt", help="Message to encrypt.", type=str)
    parser.add_argument("-d", "--decrypt", help="Message to decrypt.", type=str)
    parser.add_argument("-k", "--keyfile", help="Path to key file.", type=str)
    return parser.parse_args()

def interactive_menu(key_dict):
    while True:
        print("\n1. Encrypt a message")
        print("2. Decrypt a message")
        print("3. Exit")
        choice = input("Enter your choice (1-3): ")
        if choice == '1':
            message = input("Enter the message to encrypt: ")
            encrypted = encrypt_message(message, key_dict)
            print(f"Encrypted message: {encrypted}")
        elif choice == '2':
            message = input("Enter the message to decrypt: ")
            decrypted = decrypt_message(message, key_dict)
            print(f"Decrypted message: {decrypted}")
        elif choice == '3':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 3.")


def generate_cipher_key():
    # Create a list of all usable characters including space
    chars = string.punctuation + string.digits + string.ascii_letters + " "
    chars_list = list(chars)
    key = chars_list.copy()
    random.shuffle(key)
    # Create dictionary to map each character to its shuffled counterpart
    return dict(zip(chars_list, key))

def encrypt_message(plain_text, key_dict):
    # Encrypt the message using the key dictionary
    cipher_text = ''.join(key_dict.get(char, char) for char in plain_text)
    return cipher_text
    
def decrypt_message(cipher_text, key_dict):
    # Create a reverse key dictionary to decrypt the message
    reverse_key = {v: k for k, v in key_dict.items()}
    plain_text = ''.join(reverse_key.get(char, char) for char in cipher_text)
    return plain_text


def main():
    args = parse_args()
    
    # Load or generate key
    key_dict = generate_cipher_key()  # This could also load from a file if specified

    # Command line argument processing
    if args.encrypt:
        print("Encrypted message:", encrypt_message(args.encrypt, key_dict))
    elif args.decrypt:
        print("Decrypted message:", decrypt_message(args.decrypt, key_dict))
    else:
        # No specific operation requested, launch interactive menu
        interactive_menu(key_dict)

if __name__ == "__main__":
    main()