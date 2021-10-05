import React, { useState, useEffect } from "react";
import { ScrollView, Modal, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
  ButtonLinkShare,
} from "./styles";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import api, { key } from "../../services/api";
import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";
import { saveMovie, hasMovie, deleteMovie } from "../../utils/storage";
import { FontAwesome5 } from "@expo/vector-icons";

import Stars from "react-native-stars";

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((err) => {
          console.log(err);
        });
      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie(response.data);
        setFavoritedMovie(isFavorite);
        //console.log(response.data);
      }
    }

    if (isActive) {
      getMovie();
      setLoading(false);
    }

    return () => {
      isActive = false;
    };
  }, []);

  async function favoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
    } else {
      await saveMovie("@primereact", movie);
      setFavoritedMovie(true);
    }
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#FFF" />
        </HeaderButton>

        <HeaderButton onPress={() => favoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons name="bookmark" size={28} color="#FFF" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#FFF" />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      <ButtonLinkShare>
        <FontAwesome5 name="share" size={24} color="#FFF" />
      </ButtonLinkShare>

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={28} color="#FFF" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74E" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
          disabled={true}
        />

        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsHorizontalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Detail;
