<template>
    <div class="user-card">
        <div class="user-card__avatar">
            <img width="84" height="84" :src="avatar" :alt="fullName">
            <input
                @change="onAvatarUpload" 
                type="file" 
                class="user-card__avatar-upload"
                accept="image/png, image/gif, image/jpeg"
            />
        </div>
        <div class="user-card__info">
            <span class="user-card__name">{{ fullName }}</span>
            <ul class="user-card__properties list-reset">
                <li class="user-card__property"><b>Email:</b> {{ email }}</li>
                <li class="user-card__property"><b>Возраст:</b> {{ age }}</li>
            </ul>
        </div>
        <div v-if="loading" class="loader-container">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UserCard',
    data() {
        return {
            loading: false,
        }
    },
    props: {
        firstName: String,
        lastName: String,
        age: Number,
        email: String,
        avatar: String,
        id: String
    },
    computed: {
        fullName () {
            return this.firstName + ' ' + this.lastName
        }
    },
    methods: {
        ...mapActions('users',[
            'editUser'
        ]),
        onAvatarUpload(evt) {
            let file = evt.target.files[0]
            let reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                this.loading = true
                this.editUser({
                    id: this.id,
                    data: {
                        avatar: reader.result
                    }
                }).then(() => {
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
            };
        }
    }
}
</script>

<style lang="scss">
    .user-card {
        position: relative;
        padding: 20px;
        gap: 10px;
        display: flex;
        align-items: center;
        border: 1px solid grey;
        border-radius: 5px;
        
        &__name {
            font-weight: 500;
        }

        &__avatar {
            position: relative;
            width: 84px;
            height: 84px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }

            &-upload {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background-color: rgba($color: #000000, $alpha: .5);
                transition: opacity .2s ease;
                opacity: 0;
                font-size: 0;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    left: calc(50% - 24px / 2);
                    top: calc(50% - 24px / 2);
                    width: 24px;
                    height: 24px;
                    background-image: url('../../assets/img/file-upload-icon.png');
                    background-size: contain;
                    filter: invert(1);
                }
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
        }

        &__name {
            margin-bottom: 10px;
        }

        &__property {
            font-size: 12px;
            margin-bottom: 5px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>